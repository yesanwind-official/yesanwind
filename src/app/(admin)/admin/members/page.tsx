'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus, Pencil, Trash2, MoreHorizontal, Filter, Loader2 } from 'lucide-react';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/use-supabase';
import { partLabels } from '@/data/members';
import type { Tables } from '@/types/database';

interface MemberRow {
  id: string;
  name: string;
  instrument: string;
  part: string;
  partLabel: string;
  position?: string;
}

function dbMemberToRow(dbMember: Tables<'members'>): MemberRow {
  const part = dbMember.position === 'conductor' ? 'conductor' : (dbMember.part || 'conductor');
  return {
    id: dbMember.id,
    name: dbMember.name,
    instrument: dbMember.instrument || '지휘',
    part,
    partLabel: partLabels[part] || part,
    position: dbMember.position === 'conductor'
      ? '상임지휘자'
      : dbMember.position === 'principal'
        ? '수석'
        : undefined,
  };
}

const partColors: Record<string, string> = {
  conductor: 'bg-purple-100 text-purple-700',
  woodwind: 'bg-blue-100 text-blue-700',
  brass: 'bg-amber-100 text-amber-700',
  percussion: 'bg-green-100 text-green-700',
};

export default function MembersAdminPage() {
  const supabase = useSupabase();
  const [memberData, setMemberData] = useState<MemberRow[]>([]);
  const [isLoading, setIsLoading] = useState(!!supabase);
  const [saving, setSaving] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberRow | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPart, setFormPart] = useState('');
  const [formInstrument, setFormInstrument] = useState('');
  const [formPosition, setFormPosition] = useState('');

  const resetForm = () => {
    setFormName('');
    setFormPart('');
    setFormInstrument('');
    setFormPosition('');
  };

  const fetchMembers = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching members:', error);
      setIsLoading(false);
      return;
    }

    setMemberData((data || []).map(dbMemberToRow));
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const filteredData = useMemo(() => {
    if (selectedPart === 'all') return memberData;
    return memberData.filter((member) => member.part === selectedPart);
  }, [selectedPart, memberData]);

  const handleCreate = async () => {
    if (!formName.trim()) return;
    setSaving(true);

    // Map form position string to DB enum
    const positionValue: 'conductor' | 'principal' | 'member' =
      formPosition.trim() === '상임지휘자'
        ? 'conductor'
        : formPosition.trim() === '수석'
          ? 'principal'
          : 'member';

    const { error } = await supabase.from('members').insert({
      name: formName.trim(),
      part: positionValue === 'conductor' ? null : (formPart || null) as 'woodwind' | 'brass' | 'percussion' | null,
      instrument: formInstrument.trim() || null,
      position: positionValue,
    });

    setSaving(false);
    if (error) {
      console.error('Error creating member:', error);
      alert('단원 추가에 실패했습니다.');
      return;
    }

    setIsCreateOpen(false);
    resetForm();
    fetchMembers();
  };

  const handleEdit = async () => {
    if (!selectedMember || !formName.trim()) return;
    setSaving(true);

    const positionValue: 'conductor' | 'principal' | 'member' =
      formPosition.trim() === '상임지휘자'
        ? 'conductor'
        : formPosition.trim() === '수석'
          ? 'principal'
          : 'member';

    const { error } = await supabase
      .from('members')
      .update({
        name: formName.trim(),
        part: positionValue === 'conductor' ? null : (formPart || null) as 'woodwind' | 'brass' | 'percussion' | null,
        instrument: formInstrument.trim() || null,
        position: positionValue,
      })
      .eq('id', selectedMember.id);

    setSaving(false);
    if (error) {
      console.error('Error updating member:', error);
      alert('단원 수정에 실패했습니다.');
      return;
    }

    setIsEditOpen(false);
    resetForm();
    fetchMembers();
  };

  const handleDelete = async () => {
    if (!selectedMember) return;
    setSaving(true);

    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', selectedMember.id);

    setSaving(false);
    if (error) {
      console.error('Error deleting member:', error);
      alert('단원 삭제에 실패했습니다.');
      return;
    }

    setIsDeleteOpen(false);
    setSelectedMember(null);
    fetchMembers();
  };

  const openEditDialog = (row: MemberRow) => {
    setSelectedMember(row);
    setFormName(row.name);
    setFormPart(row.part);
    setFormInstrument(row.instrument);
    setFormPosition(row.position || '');
    setIsEditOpen(true);
  };

  const memberSortOptions: SortOption[] = [
    { key: 'name', label: '이름' },
    { key: 'instrument', label: '악기' },
  ];

  const renderMemberCard = (row: MemberRow) => (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-sm font-medium text-gold-600">
          {row.name.charAt(0)}
        </div>
        <span className="font-medium text-foreground">{row.name}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">{row.instrument}</span>
          <Badge className={partColors[row.part] || 'bg-neutral-100'}>{row.partLabel}</Badge>
          {row.position && (
            <Badge variant="outline" className="">{row.position}</Badge>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => { setSelectedMember(row); setIsDeleteOpen(true); }}
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

  const columns: Column<MemberRow>[] = [
    {
      key: 'name',
      header: '이름',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-sm font-medium text-gold-600">
            {row.name.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'part',
      header: '파트',
      cell: (row) => (
        <Badge className={partColors[row.part] || 'bg-neutral-100'}>
          {row.partLabel}
        </Badge>
      ),
    },
    {
      key: 'instrument',
      header: '악기',
      sortable: true,
      cell: (row) => <span className="text-foreground">{row.instrument}</span>,
    },
    {
      key: 'position',
      header: '직책',
      cell: (row) =>
        row.position ? (
          <Badge variant="outline" className="">
            {row.position}
          </Badge>
        ) : (
          <span className="text-muted-foreground">-</span>
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
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedMember(row);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
        <span className="ml-3 text-muted-foreground">단원 정보를 불러오는 중...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">단원 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            오케스트라 단원 정보를 관리합니다. 총 {memberData.length}명
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
          단원 추가
        </Button>
      </div>

      {/* Part Filter Tabs */}
      <div className="flex items-center gap-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Tabs value={selectedPart} onValueChange={setSelectedPart}>
          <TabsList className="bg-muted border border-border overflow-x-auto">
            <TabsTrigger value="all" className="data-[state=active]:bg-gold-500 data-[state=active]:text-white">
              전체 ({memberData.length})
            </TabsTrigger>
            <TabsTrigger value="conductor" className="data-[state=active]:bg-gold-500 data-[state=active]:text-white">
              지휘 ({memberData.filter((m) => m.part === 'conductor').length})
            </TabsTrigger>
            <TabsTrigger value="woodwind" className="data-[state=active]:bg-gold-500 data-[state=active]:text-white">
              목관 ({memberData.filter((m) => m.part === 'woodwind').length})
            </TabsTrigger>
            <TabsTrigger value="brass" className="data-[state=active]:bg-gold-500 data-[state=active]:text-white">
              금관 ({memberData.filter((m) => m.part === 'brass').length})
            </TabsTrigger>
            <TabsTrigger value="percussion" className="data-[state=active]:bg-gold-500 data-[state=active]:text-white">
              타악기 ({memberData.filter((m) => m.part === 'percussion').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        searchKey="name"
        searchPlaceholder="이름으로 검색..."
        pageSize={15}
        renderMobileCard={renderMemberCard}
        mobileSortOptions={memberSortOptions}
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>단원 추가</DialogTitle>
            <DialogDescription>
              새로운 단원 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                placeholder="홍길동"
                className=""
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="part">파트</Label>
                <select
                  id="part"
                  className="h-9 w-full rounded-md border border-border bg-transparent px-3 text-sm"
                  value={formPart}
                  onChange={(e) => setFormPart(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="conductor">지휘자</option>
                  <option value="woodwind">목관</option>
                  <option value="brass">금관</option>
                  <option value="percussion">타악기</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instrument">악기</Label>
                <Input
                  id="instrument"
                  placeholder="플루트"
                  className=""
                  value={formInstrument}
                  onChange={(e) => setFormInstrument(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">직책 (선택)</Label>
              <Input
                id="position"
                placeholder="상임지휘자, 수석 등"
                className=""
                value={formPosition}
                onChange={(e) => setFormPosition(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} disabled={saving}>
              취소
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving || !formName.trim()}
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
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>단원 수정</DialogTitle>
            <DialogDescription>
              단원 정보를 수정하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">이름</Label>
              <Input
                id="edit-name"
                className=""
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-part">파트</Label>
                <select
                  id="edit-part"
                  className="h-9 w-full rounded-md border border-border bg-transparent px-3 text-sm"
                  value={formPart}
                  onChange={(e) => setFormPart(e.target.value)}
                >
                  <option value="conductor">지휘자</option>
                  <option value="woodwind">목관</option>
                  <option value="brass">금관</option>
                  <option value="percussion">타악기</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-instrument">악기</Label>
                <Input
                  id="edit-instrument"
                  className=""
                  value={formInstrument}
                  onChange={(e) => setFormInstrument(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">직책 (선택)</Label>
              <Input
                id="edit-position"
                className=""
                value={formPosition}
                onChange={(e) => setFormPosition(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={saving}>
              취소
            </Button>
            <Button
              onClick={handleEdit}
              disabled={saving || !formName.trim()}
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
            <DialogTitle>단원 삭제</DialogTitle>
            <DialogDescription>
              정말로 &quot;{selectedMember?.name}&quot; 단원을 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={saving}>
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
