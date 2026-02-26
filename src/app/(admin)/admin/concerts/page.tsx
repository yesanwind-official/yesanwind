'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Eye, MoreHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column, SortOption } from '@/components/admin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSupabase } from '@/hooks/use-supabase';
import type { ConcertType, ConcertStatus } from '@/types/database';

interface ConcertRow {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  concertType: string;
  status: string;
  statusLabel: string;
}

const categoryMap: Record<string, string> = {
  regular: '정기연주회',
  special: '기획공연',
};

const statusMapLabel: Record<string, string> = {
  upcoming: '예매중',
  ongoing: '공연중',
  ended: '종료',
};

const statusColors: Record<string, string> = {
  upcoming: 'bg-green-100 text-green-700',
  ongoing: 'bg-blue-100 text-blue-700',
  completed: 'bg-neutral-100 text-foreground',
  cancelled: 'bg-red-100 text-red-700',
};

/** UI status -> DB status mapping */
function toDbStatus(uiStatus: string): ConcertStatus {
  if (uiStatus === 'completed') return 'ended';
  return uiStatus as ConcertStatus;
}

export default function ConcertsAdminPage() {
  const supabase = useSupabase();
  const [concertData, setConcertData] = useState<ConcertRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<ConcertRow | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [formVenue, setFormVenue] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formConcertType, setFormConcertType] = useState<ConcertType>('regular');
  const [formStatus, setFormStatus] = useState('upcoming');

  const resetForm = () => {
    setFormTitle('');
    setFormDate('');
    setFormTime('');
    setFormVenue('');
    setFormDescription('');
    setFormConcertType('regular');
    setFormStatus('upcoming');
  };

  const fetchConcerts = useCallback(async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('concerts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('[admin/concerts] fetch error:', error.message);
      setIsLoading(false);
      return;
    }

    const rows: ConcertRow[] = (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      category: row.concert_type,
      categoryLabel: categoryMap[row.concert_type] || row.concert_type,
      date: row.date,
      time: row.time,
      venue: row.venue,
      description: row.description || '',
      concertType: row.concert_type,
      status: row.status === 'ended' ? 'completed' : row.status,
      statusLabel: statusMapLabel[row.status] || row.status,
    }));

    setConcertData(rows);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchConcerts();
  }, [fetchConcerts]);

  const handleCreate = async () => {
    if (!formTitle.trim() || !formDate || !formTime || !formVenue.trim()) return;
    setSaving(true);

    const { error } = await supabase!.from('concerts').insert({
      title: formTitle.trim(),
      date: formDate,
      time: formTime,
      venue: formVenue.trim(),
      description: formDescription.trim() || null,
      concert_type: formConcertType,
      status: toDbStatus(formStatus),
    });

    setSaving(false);
    if (error) {
      console.error('Error creating concert:', error);
      alert('공연 등록에 실패했습니다.');
      return;
    }

    setIsCreateOpen(false);
    resetForm();
    fetchConcerts();
  };

  const handleEdit = async () => {
    if (!selectedConcert || !formTitle.trim() || !formDate || !formTime || !formVenue.trim()) return;
    setSaving(true);

    const { error } = await supabase!
      .from('concerts')
      .update({
        title: formTitle.trim(),
        date: formDate,
        time: formTime,
        venue: formVenue.trim(),
        description: formDescription.trim() || null,
        concert_type: formConcertType,
        status: toDbStatus(formStatus),
      })
      .eq('id', selectedConcert.id);

    setSaving(false);
    if (error) {
      console.error('Error updating concert:', error);
      alert('공연 수정에 실패했습니다.');
      return;
    }

    setIsEditOpen(false);
    resetForm();
    fetchConcerts();
  };

  const handleDelete = async () => {
    if (!selectedConcert) return;
    setSaving(true);

    const { error } = await supabase!
      .from('concerts')
      .delete()
      .eq('id', selectedConcert.id);

    setSaving(false);
    if (error) {
      console.error('Error deleting concert:', error);
      alert('공연 삭제에 실패했습니다.');
      return;
    }

    setIsDeleteOpen(false);
    setSelectedConcert(null);
    fetchConcerts();
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase!
      .from('concerts')
      .update({ status: toDbStatus(newStatus) })
      .eq('id', id);

    if (error) {
      console.error('Error changing status:', error);
      alert('상태 변경에 실패했습니다.');
      return;
    }

    fetchConcerts();
  };

  const openEditDialog = (row: ConcertRow) => {
    setSelectedConcert(row);
    setFormTitle(row.title);
    setFormDate(row.date);
    setFormTime(row.time);
    setFormVenue(row.venue);
    setFormDescription(row.description);
    setFormConcertType(row.concertType as ConcertType);
    setFormStatus(row.status);
    setIsEditOpen(true);
  };

  const concertSortOptions: SortOption[] = [
    { key: 'title', label: '공연명' },
    { key: 'date', label: '일시' },
  ];

  const renderConcertCard = (row: ConcertRow) => (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex items-center justify-between">
        <Badge className="bg-neutral-100 text-foreground text-xs">{row.categoryLabel}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge className={statusColors[row.status] || 'bg-neutral-100'}>
                {row.statusLabel}
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'upcoming')}>예정</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'ongoing')}>진행중</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'completed')}>종료</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'cancelled')}>취소</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="font-medium text-foreground truncate">{row.title}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground truncate">
          {row.date} · {row.venue}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/concerts/${row.id}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                보기
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => { setSelectedConcert(row); setIsDeleteOpen(true); }}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const columns: Column<ConcertRow>[] = [
    {
      key: 'title',
      header: '공연명',
      sortable: true,
      cell: (row) => (
        <div className="max-w-xs">
          <p className="font-medium text-foreground truncate">{row.title}</p>
          <p className="text-xs text-muted-foreground">{row.categoryLabel}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: '일시',
      sortable: true,
      cell: (row) => (
        <span className="text-foreground">{row.date}</span>
      ),
    },
    {
      key: 'venue',
      header: '장소',
      cell: (row) => (
        <span className="text-foreground truncate max-w-[200px] block">{row.venue}</span>
      ),
    },
    {
      key: 'status',
      header: '상태',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge className={statusColors[row.status] || 'bg-neutral-100'}>
                {row.statusLabel}
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'upcoming')}>
              예정
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'ongoing')}>
              진행중
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'completed')}>
              종료
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(row.id, 'cancelled')}>
              취소
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      key: 'actions',
      header: '',
      className: 'w-[50px]',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href={`/concerts/${row.id}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                보기
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedConcert(row);
                setIsDeleteOpen(true);
              }}
              className="text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">공연 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            공연 일정을 추가, 수정, 삭제할 수 있습니다.
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setIsCreateOpen(true);
          }}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          공연 추가
        </Button>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          데이터를 불러오는 중...
        </div>
      ) : (
        <DataTable
          data={concertData}
          columns={columns}
          searchKey="title"
          searchPlaceholder="공연명으로 검색..."
          pageSize={10}
          renderMobileCard={renderConcertCard}
          mobileSortOptions={concertSortOptions}
        />
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공연 추가</DialogTitle>
            <DialogDescription>
              새로운 공연 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">공연명</Label>
              <Input
                id="title"
                placeholder="제47회 정기연주회"
                className=""
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="concert-type">공연 유형</Label>
                <select
                  id="concert-type"
                  className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                  value={formConcertType}
                  onChange={(e) => setFormConcertType(e.target.value as ConcertType)}
                >
                  <option value="regular">정기연주회</option>
                  <option value="special">기획공연</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">상태</Label>
                <select
                  id="status"
                  className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                  <option value="upcoming">예매중</option>
                  <option value="ongoing">공연중</option>
                  <option value="completed">종료</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">날짜</Label>
                <Input
                  id="date"
                  type="date"
                  className=""
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">시간</Label>
                <Input
                  id="time"
                  type="time"
                  className=""
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="venue">장소</Label>
              <Input
                id="venue"
                placeholder="예산문화예술회관 대공연장"
                className=""
                value={formVenue}
                onChange={(e) => setFormVenue(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="공연에 대한 설명을 입력하세요."
                rows={3}
                className=""
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving || !formTitle.trim() || !formDate || !formTime || !formVenue.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>공연 수정</DialogTitle>
            <DialogDescription>
              공연 정보를 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">공연명</Label>
              <Input
                id="edit-title"
                className=""
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-concert-type">공연 유형</Label>
                <select
                  id="edit-concert-type"
                  className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                  value={formConcertType}
                  onChange={(e) => setFormConcertType(e.target.value as ConcertType)}
                >
                  <option value="regular">정기연주회</option>
                  <option value="special">기획공연</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">상태</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                  <option value="upcoming">예매중</option>
                  <option value="ongoing">공연중</option>
                  <option value="completed">종료</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-date">날짜</Label>
                <Input
                  id="edit-date"
                  type="date"
                  className=""
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-time">시간</Label>
                <Input
                  id="edit-time"
                  type="time"
                  className=""
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-venue">장소</Label>
              <Input
                id="edit-venue"
                className=""
                value={formVenue}
                onChange={(e) => setFormVenue(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">설명</Label>
              <Textarea
                id="edit-description"
                placeholder="공연에 대한 설명을 입력하세요."
                rows={3}
                className=""
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleEdit}
              disabled={saving || !formTitle.trim() || !formDate || !formTime || !formVenue.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공연 삭제</DialogTitle>
            <DialogDescription>
              정말로 &quot;{selectedConcert?.title}&quot; 공연을 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
