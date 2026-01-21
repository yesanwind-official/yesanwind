'use client';

import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, MoreHorizontal, Filter } from 'lucide-react';
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allMembers, partLabels } from '@/data/members';

interface MemberRow {
  id: string;
  name: string;
  instrument: string;
  part: string;
  partLabel: string;
  position?: string;
}

const memberData: MemberRow[] = allMembers.map((member) => ({
  id: member.id,
  name: member.name,
  instrument: member.instrument,
  part: member.part,
  partLabel: partLabels[member.part] || member.part,
  position: member.position,
}));

const partColors: Record<string, string> = {
  conductor: 'bg-purple-100 text-purple-700',
  woodwind: 'bg-blue-100 text-blue-700',
  brass: 'bg-amber-100 text-amber-700',
  percussion: 'bg-green-100 text-green-700',
};

export default function MembersAdminPage() {
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberRow | null>(null);

  const filteredData = useMemo(() => {
    if (selectedPart === 'all') return memberData;
    return memberData.filter((member) => member.part === selectedPart);
  }, [selectedPart]);

  const handleCreate = () => {
    console.log('Create member');
    setIsCreateOpen(false);
  };

  const handleEdit = () => {
    console.log('Edit member:', selectedMember?.id);
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    console.log('Delete member:', selectedMember?.id);
    setIsDeleteOpen(false);
  };

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
          <span className="font-medium text-neutral-900">{row.name}</span>
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
      cell: (row) => <span className="text-neutral-700">{row.instrument}</span>,
    },
    {
      key: 'position',
      header: '직책',
      cell: (row) =>
        row.position ? (
          <Badge variant="outline" className="bg-white">
            {row.position}
          </Badge>
        ) : (
          <span className="text-neutral-400">-</span>
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
            <DropdownMenuItem
              onClick={() => {
                setSelectedMember(row);
                setIsEditOpen(true);
              }}
            >
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">단원 관리</h1>
          <p className="mt-1 text-sm text-neutral-500">
            오케스트라 단원 정보를 관리합니다. 총 {memberData.length}명
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          단원 추가
        </Button>
      </div>

      {/* Part Filter Tabs */}
      <div className="flex items-center gap-4">
        <Filter className="h-4 w-4 text-neutral-500" />
        <Tabs value={selectedPart} onValueChange={setSelectedPart}>
          <TabsList className="bg-white border border-neutral-200">
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
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>단원 추가</DialogTitle>
            <DialogDescription>
              새로운 단원 정보를 입력하세요.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" className="bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="part">파트</Label>
                <select
                  id="part"
                  className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm"
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
                <Input id="instrument" placeholder="플루트" className="bg-white" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">직책 (선택)</Label>
              <Input id="position" placeholder="수석, 부수석 등" className="bg-white" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">이메일 (선택)</Label>
              <Input id="email" type="email" placeholder="example@email.com" className="bg-white" />
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
        <DialogContent className="max-w-lg bg-white">
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
                defaultValue={selectedMember?.name}
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-part">파트</Label>
                <select
                  id="edit-part"
                  defaultValue={selectedMember?.part}
                  className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm"
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
                  defaultValue={selectedMember?.instrument}
                  className="bg-white"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-position">직책 (선택)</Label>
              <Input
                id="edit-position"
                defaultValue={selectedMember?.position}
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
            <DialogTitle>단원 삭제</DialogTitle>
            <DialogDescription>
              정말로 &quot;{selectedMember?.name}&quot; 단원을 삭제하시겠습니까?
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
