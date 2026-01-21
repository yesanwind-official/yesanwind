'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, Column } from '@/components/admin';
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
import { mockConcerts } from '@/data/mock-concerts';

interface ConcertRow {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  venue: string;
  status: string;
  statusLabel: string;
}

const concertData: ConcertRow[] = mockConcerts.map((concert) => ({
  id: concert.id,
  title: concert.title,
  category: concert.category,
  categoryLabel: concert.categoryLabel,
  date: concert.date,
  venue: concert.venue,
  status: concert.status,
  statusLabel: concert.statusLabel,
}));

const statusColors: Record<string, string> = {
  upcoming: 'bg-green-100 text-green-700',
  ongoing: 'bg-blue-100 text-blue-700',
  completed: 'bg-neutral-100 text-neutral-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function ConcertsAdminPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<ConcertRow | null>(null);

  const handleCreate = () => {
    console.log('Create concert');
    setIsCreateOpen(false);
  };

  const handleEdit = () => {
    console.log('Edit concert:', selectedConcert?.id);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete concert:', selectedConcert?.id);
    setIsDeleteOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log('Change status:', id, newStatus);
  };

  const columns: Column<ConcertRow>[] = [
    {
      key: 'title',
      header: '공연명',
      sortable: true,
      cell: (row) => (
        <div className="max-w-xs">
          <p className="font-medium text-neutral-900 truncate">{row.title}</p>
          <p className="text-xs text-neutral-500">{row.categoryLabel}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: '일시',
      sortable: true,
      cell: (row) => (
        <span className="text-neutral-700">{row.date}</span>
      ),
    },
    {
      key: 'venue',
      header: '장소',
      cell: (row) => (
        <span className="text-neutral-700 truncate max-w-[200px] block">{row.venue}</span>
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
            <DropdownMenuItem
              onClick={() => {
                setSelectedConcert(row);
                setIsEditOpen(true);
              }}
            >
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">공연 관리</h1>
          <p className="mt-1 text-sm text-neutral-500">
            공연 일정을 추가, 수정, 삭제할 수 있습니다.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          공연 추가
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={concertData}
        columns={columns}
        searchKey="title"
        searchPlaceholder="공연명으로 검색..."
        pageSize={10}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>공연 추가</DialogTitle>
            <DialogDescription>
              새로운 공연 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">공연명</Label>
              <Input id="title" placeholder="제47회 정기연주회" className="bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">날짜</Label>
                <Input id="date" type="date" className="bg-white" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">시간</Label>
                <Input id="time" type="time" className="bg-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="venue">장소</Label>
              <Input id="venue" placeholder="예산문화예술회관 대공연장" className="bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                placeholder="공연에 대한 설명을 입력하세요."
                rows={3}
                className="bg-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreate} className="bg-gold-500 hover:bg-gold-600 text-white">
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl bg-white">
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
                defaultValue={selectedConcert?.title}
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-date">날짜</Label>
                <Input
                  id="edit-date"
                  type="date"
                  defaultValue={selectedConcert?.date}
                  className="bg-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-time">시간</Label>
                <Input id="edit-time" type="time" className="bg-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-venue">장소</Label>
              <Input
                id="edit-venue"
                defaultValue={selectedConcert?.venue}
                className="bg-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEdit} className="bg-gold-500 hover:bg-gold-600 text-white">
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-white">
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
            <Button variant="destructive" onClick={handleDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
