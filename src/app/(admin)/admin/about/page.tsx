'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, MoreHorizontal, Loader2, Save, Star, X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/use-supabase';
import type { Json } from '@/types/database';

// --- Types ---

interface GreetingPerson {
  name: string;
  title: string;
  greeting: string;
  signature: string;
}

interface GreetingData {
  conductor: GreetingPerson;
  president: GreetingPerson;
}

interface HistoryRow {
  id: string;
  year: number;
  month: number | null;
  content: string;
  highlight: boolean;
  displayOrder: number;
}

interface LeadershipItem {
  position: string;
  name: string;
  description: string;
}

interface StaffItem {
  position: string;
  name: string;
  description: string;
}

interface InstrumentItem {
  name: string;
  count: number;
  leader: string | null;
}

interface PartItem {
  id: string;
  name: string;
  englishName: string;
  color: string;
  description: string;
  totalMembers: number;
  instruments: InstrumentItem[];
}

interface OrganizationData {
  leadership: LeadershipItem[];
  staff: StaffItem[];
  parts: PartItem[];
}

// --- Component ---

export default function AboutAdminPage() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Greeting state
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [conductorName, setConductorName] = useState('');
  const [conductorTitle, setConductorTitle] = useState('');
  const [conductorGreeting, setConductorGreeting] = useState('');
  const [conductorSignature, setConductorSignature] = useState('');
  const [presidentName, setPresidentName] = useState('');
  const [presidentTitle, setPresidentTitle] = useState('');
  const [presidentGreeting, setPresidentGreeting] = useState('');
  const [presidentSignature, setPresidentSignature] = useState('');

  // History state
  const [historyItems, setHistoryItems] = useState<HistoryRow[]>([]);
  const [isHistoryCreateOpen, setIsHistoryCreateOpen] = useState(false);
  const [isHistoryEditOpen, setIsHistoryEditOpen] = useState(false);
  const [isHistoryDeleteOpen, setIsHistoryDeleteOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<HistoryRow | null>(null);
  const [formYear, setFormYear] = useState('');
  const [formMonth, setFormMonth] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formHighlight, setFormHighlight] = useState(false);

  // Organization state
  const [organization, setOrganization] = useState<OrganizationData | null>(null);
  const [orgLeadership, setOrgLeadership] = useState<LeadershipItem[]>([]);
  const [orgStaff, setOrgStaff] = useState<StaffItem[]>([]);
  const [orgParts, setOrgParts] = useState<PartItem[]>([]);

  // --- Fetch ---

  const fetchGreeting = useCallback(async () => {
    const { data, error } = await supabase
      .from('orchestra_info')
      .select('*')
      .eq('key', 'greeting')
      .single();

    if (error) {
      console.error('Error fetching greeting:', error);
      return;
    }

    if (data?.metadata) {
      const meta = data.metadata as unknown as GreetingData;
      setGreeting(meta);
      setConductorName(meta.conductor?.name || '');
      setConductorTitle(meta.conductor?.title || '');
      setConductorGreeting(meta.conductor?.greeting || '');
      setConductorSignature(meta.conductor?.signature || '');
      setPresidentName(meta.president?.name || '');
      setPresidentTitle(meta.president?.title || '');
      setPresidentGreeting(meta.president?.greeting || '');
      setPresidentSignature(meta.president?.signature || '');
    }
  }, [supabase]);

  const fetchHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from('history_items')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
      return;
    }

    setHistoryItems(
      (data || []).map((item) => ({
        id: item.id,
        year: item.year,
        month: item.month,
        content: item.content,
        highlight: item.highlight,
        displayOrder: item.display_order,
      }))
    );
  }, [supabase]);

  const fetchOrganization = useCallback(async () => {
    const { data, error } = await supabase
      .from('orchestra_info')
      .select('*')
      .eq('key', 'organization')
      .single();

    if (error) {
      console.error('Error fetching organization:', error);
      return;
    }

    if (data?.metadata) {
      const meta = data.metadata as unknown as OrganizationData;
      setOrganization(meta);
      setOrgLeadership(meta.leadership || []);
      setOrgStaff(meta.staff || []);
      setOrgParts(meta.parts || []);
    }
  }, [supabase]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchGreeting(), fetchHistory(), fetchOrganization()]);
      setLoading(false);
    };
    load();
  }, [fetchGreeting, fetchHistory, fetchOrganization]);

  // --- Greeting Handlers ---

  const handleSaveGreeting = async () => {
    if (!conductorName.trim() || !presidentName.trim()) {
      alert('지휘자와 단장 이름은 필수 입력 항목입니다.');
      return;
    }
    if (!conductorGreeting.trim() || !presidentGreeting.trim()) {
      alert('인사말은 필수 입력 항목입니다.');
      return;
    }
    setSaving(true);
    const metadata: GreetingData = {
      conductor: {
        name: conductorName.trim(),
        title: conductorTitle.trim(),
        greeting: conductorGreeting.trim(),
        signature: conductorSignature.trim(),
      },
      president: {
        name: presidentName.trim(),
        title: presidentTitle.trim(),
        greeting: presidentGreeting.trim(),
        signature: presidentSignature.trim(),
      },
    };

    const { data, error } = await supabase
      .from('orchestra_info')
      .update({ metadata: metadata as unknown as Json, updated_at: new Date().toISOString() })
      .eq('key', 'greeting')
      .select();

    setSaving(false);
    if (error) {
      console.error('Error saving greeting:', error);
      alert('인사말 저장에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('인사말 저장에 실패했습니다. 권한을 확인해주세요.');
      return;
    }
    alert('인사말이 저장되었습니다.');
  };

  // --- History Handlers ---

  const resetHistoryForm = () => {
    setFormYear('');
    setFormMonth('');
    setFormContent('');
    setFormHighlight(false);
  };

  const handleHistoryCreate = async () => {
    if (!formYear || !formContent.trim()) return;
    setSaving(true);

    const { data, error } = await supabase.from('history_items').insert({
      year: parseInt(formYear),
      month: formMonth ? parseInt(formMonth) : null,
      content: formContent.trim(),
      highlight: formHighlight,
    }).select();

    setSaving(false);
    if (error) {
      console.error('Error creating history:', error);
      alert('연혁 등록에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('연혁 등록에 실패했습니다. 권한을 확인해주세요.');
      return;
    }

    setIsHistoryCreateOpen(false);
    resetHistoryForm();
    fetchHistory();
  };

  const handleHistoryEdit = async () => {
    if (!selectedHistory || !formYear || !formContent.trim()) return;
    setSaving(true);

    const { data, error } = await supabase
      .from('history_items')
      .update({
        year: parseInt(formYear),
        month: formMonth ? parseInt(formMonth) : null,
        content: formContent.trim(),
        highlight: formHighlight,
      })
      .eq('id', selectedHistory.id)
      .select();

    setSaving(false);
    if (error) {
      console.error('Error updating history:', error);
      alert('연혁 수정에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('연혁 수정에 실패했습니다. 권한을 확인해주세요.');
      return;
    }

    setIsHistoryEditOpen(false);
    resetHistoryForm();
    fetchHistory();
  };

  const handleHistoryDelete = async () => {
    if (!selectedHistory) return;
    setSaving(true);

    const { data, error } = await supabase
      .from('history_items')
      .delete()
      .eq('id', selectedHistory.id)
      .select();

    setSaving(false);
    if (error) {
      console.error('Error deleting history:', error);
      alert('연혁 삭제에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('연혁 삭제에 실패했습니다. 권한을 확인해주세요.');
      return;
    }

    setIsHistoryDeleteOpen(false);
    setSelectedHistory(null);
    fetchHistory();
  };

  const openHistoryEditDialog = (row: HistoryRow) => {
    setSelectedHistory(row);
    setFormYear(String(row.year));
    setFormMonth(row.month ? String(row.month) : '');
    setFormContent(row.content);
    setFormHighlight(row.highlight);
    setIsHistoryEditOpen(true);
  };

  // --- Organization Handlers ---

  // --- Organization helpers ---

  const updateLeadership = (index: number, field: keyof LeadershipItem, value: string) => {
    setOrgLeadership(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const addLeadership = () => {
    setOrgLeadership(prev => [...prev, { position: '', name: '', description: '' }]);
  };
  const removeLeadership = (index: number) => {
    setOrgLeadership(prev => prev.filter((_, i) => i !== index));
  };

  const updateStaff = (index: number, field: keyof StaffItem, value: string) => {
    setOrgStaff(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const addStaff = () => {
    setOrgStaff(prev => [...prev, { position: '', name: '', description: '' }]);
  };
  const removeStaff = (index: number) => {
    setOrgStaff(prev => prev.filter((_, i) => i !== index));
  };

  const updatePart = (index: number, field: string, value: string | number) => {
    setOrgParts(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };
  const addPart = () => {
    setOrgParts(prev => [...prev, {
      id: `part-${Date.now()}`, name: '', englishName: '', color: 'emerald',
      description: '', totalMembers: 0, instruments: [],
    }]);
  };
  const removePart = (index: number) => {
    setOrgParts(prev => prev.filter((_, i) => i !== index));
  };

  const updateInstrument = (partIdx: number, instIdx: number, field: string, value: string | number | null) => {
    setOrgParts(prev => prev.map((part, pi) => {
      if (pi !== partIdx) return part;
      return {
        ...part,
        instruments: part.instruments.map((inst, ii) =>
          ii === instIdx ? { ...inst, [field]: value } : inst
        ),
      };
    }));
  };
  const addInstrument = (partIdx: number) => {
    setOrgParts(prev => prev.map((part, pi) => {
      if (pi !== partIdx) return part;
      return { ...part, instruments: [...part.instruments, { name: '', count: 1, leader: null }] };
    }));
  };
  const removeInstrument = (partIdx: number, instIdx: number) => {
    setOrgParts(prev => prev.map((part, pi) => {
      if (pi !== partIdx) return part;
      return { ...part, instruments: part.instruments.filter((_, ii) => ii !== instIdx) };
    }));
  };

  const handleSaveOrganization = async () => {
    if (orgLeadership.some(l => !l.name.trim() || !l.position.trim())) {
      alert('지휘부/임원의 이름과 직책을 모두 입력해주세요.');
      return;
    }
    if (orgStaff.some(s => !s.name.trim() || !s.position.trim())) {
      alert('스태프의 이름과 직책을 모두 입력해주세요.');
      return;
    }
    if (orgParts.some(p => !p.name.trim())) {
      alert('파트 이름을 모두 입력해주세요.');
      return;
    }

    const orgData: OrganizationData = {
      leadership: orgLeadership,
      staff: orgStaff,
      parts: orgParts,
    };

    setSaving(true);
    const { data, error } = await supabase
      .from('orchestra_info')
      .update({ metadata: orgData as unknown as Json, updated_at: new Date().toISOString() })
      .eq('key', 'organization')
      .select();

    setSaving(false);
    if (error) {
      console.error('Error saving organization:', error);
      alert('조직도 저장에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('조직도 저장에 실패했습니다. 권한을 확인해주세요.');
      return;
    }
    alert('조직도가 저장되었습니다.');
    setOrganization(orgData);
  };

  // --- Table Columns ---

  const historySortOptions: SortOption[] = [
    { key: 'year', label: '연도' },
    { key: 'content', label: '내용' },
  ];

  const historyColumns: Column<HistoryRow>[] = [
    {
      key: 'year',
      header: '연도',
      sortable: true,
      className: 'w-[80px]',
      cell: (row) => <span className="text-foreground font-medium">{row.year}</span>,
    },
    {
      key: 'month',
      header: '월',
      className: 'w-[60px]',
      cell: (row) => <span className="text-foreground">{row.month ? `${row.month}월` : '-'}</span>,
    },
    {
      key: 'content',
      header: '내용',
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-2 max-w-lg">
          {row.highlight && <Star className="h-4 w-4 shrink-0 text-gold-500 fill-gold-500" />}
          <span className="text-foreground truncate">{row.content}</span>
        </div>
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
            <DropdownMenuItem onClick={() => openHistoryEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedHistory(row);
                setIsHistoryDeleteOpen(true);
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

  const renderHistoryCard = (row: HistoryRow) => (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex items-center gap-2">
        {row.highlight && <Star className="h-4 w-4 shrink-0 text-gold-500 fill-gold-500" />}
        <p className="font-medium text-foreground truncate">{row.content}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {row.year}년 {row.month ? `${row.month}월` : ''}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openHistoryEditDialog(row)}>
              <Pencil className="mr-2 h-4 w-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedHistory(row);
                setIsHistoryDeleteOpen(true);
              }}
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

  // --- Render ---

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">소개 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          오케스트라 소개 페이지의 인사말, 연혁, 조직도를 관리합니다.
        </p>
      </div>

      <Tabs defaultValue="greeting">
        <TabsList>
          <TabsTrigger value="greeting">인사말</TabsTrigger>
          <TabsTrigger value="history">연혁</TabsTrigger>
          <TabsTrigger value="organization">조직도</TabsTrigger>
        </TabsList>

        {/* ===== 탭 1: 인사말 ===== */}
        <TabsContent value="greeting" className="space-y-8 pt-4">
          {/* Conductor */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">지휘자 인사말</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="conductor-name">이름</Label>
                <Input
                  id="conductor-name"
                  value={conductorName}
                  onChange={(e) => setConductorName(e.target.value)}
                  placeholder="이름"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="conductor-title">직함</Label>
                <Input
                  id="conductor-title"
                  value={conductorTitle}
                  onChange={(e) => setConductorTitle(e.target.value)}
                  placeholder="직함"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="conductor-greeting">인사말</Label>
              <Textarea
                id="conductor-greeting"
                value={conductorGreeting}
                onChange={(e) => setConductorGreeting(e.target.value)}
                placeholder="인사말을 입력하세요"
                rows={10}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="conductor-signature">서명</Label>
              <Input
                id="conductor-signature"
                value={conductorSignature}
                onChange={(e) => setConductorSignature(e.target.value)}
                placeholder="서명 (예: 예산윈드오케스트라 음악감독 겸 상임지휘자)"
              />
            </div>
          </div>

          {/* President */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">단장 인사말</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="president-name">이름</Label>
                <Input
                  id="president-name"
                  value={presidentName}
                  onChange={(e) => setPresidentName(e.target.value)}
                  placeholder="이름"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="president-title">직함</Label>
                <Input
                  id="president-title"
                  value={presidentTitle}
                  onChange={(e) => setPresidentTitle(e.target.value)}
                  placeholder="직함"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="president-greeting">인사말</Label>
              <Textarea
                id="president-greeting"
                value={presidentGreeting}
                onChange={(e) => setPresidentGreeting(e.target.value)}
                placeholder="인사말을 입력하세요"
                rows={10}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="president-signature">서명</Label>
              <Input
                id="president-signature"
                value={presidentSignature}
                onChange={(e) => setPresidentSignature(e.target.value)}
                placeholder="서명 (예: 예산윈드오케스트라 단장)"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveGreeting}
              disabled={saving}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              인사말 저장
            </Button>
          </div>
        </TabsContent>

        {/* ===== 탭 2: 연혁 ===== */}
        <TabsContent value="history" className="space-y-4 pt-4">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                resetHistoryForm();
                setIsHistoryCreateOpen(true);
              }}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              연혁 추가
            </Button>
          </div>

          <DataTable
            data={historyItems}
            columns={historyColumns}
            searchKey="content"
            searchPlaceholder="내용으로 검색..."
            pageSize={15}
            renderMobileCard={renderHistoryCard}
            mobileSortOptions={historySortOptions}
          />
        </TabsContent>

        {/* ===== 탭 3: 조직도 ===== */}
        <TabsContent value="organization" className="space-y-6 pt-4">

          {/* 지휘부/임원 */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">지휘부 / 임원</h3>
              <Button variant="outline" size="sm" onClick={addLeadership}>
                <Plus className="mr-1 h-4 w-4" /> 추가
              </Button>
            </div>
            <div className="space-y-3">
              {orgLeadership.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-2 shrink-0" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">직책</Label>
                      <Input
                        value={item.position}
                        onChange={(e) => updateLeadership(idx, 'position', e.target.value)}
                        placeholder="예: 단장"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">이름</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateLeadership(idx, 'name', e.target.value)}
                        placeholder="이름"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">설명</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateLeadership(idx, 'description', e.target.value)}
                        placeholder="역할 설명"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => removeLeadership(idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-5 shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {orgLeadership.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">등록된 임원이 없습니다. &quot;추가&quot; 버튼을 눌러 추가하세요.</p>
              )}
            </div>
          </div>

          {/* 스태프 */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">스태프</h3>
              <Button variant="outline" size="sm" onClick={addStaff}>
                <Plus className="mr-1 h-4 w-4" /> 추가
              </Button>
            </div>
            <div className="space-y-3">
              {orgStaff.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-2 shrink-0" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">직책</Label>
                      <Input
                        value={item.position}
                        onChange={(e) => updateStaff(idx, 'position', e.target.value)}
                        placeholder="예: 총무"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">이름</Label>
                      <Input
                        value={item.name}
                        onChange={(e) => updateStaff(idx, 'name', e.target.value)}
                        placeholder="이름"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">설명</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => updateStaff(idx, 'description', e.target.value)}
                        placeholder="역할 설명"
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon-sm" onClick={() => removeStaff(idx)} className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-5 shrink-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {orgStaff.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">등록된 스태프가 없습니다.</p>
              )}
            </div>
          </div>

          {/* 파트별 구성 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">파트별 구성</h3>
              <Button variant="outline" size="sm" onClick={addPart}>
                <Plus className="mr-1 h-4 w-4" /> 파트 추가
              </Button>
            </div>

            {orgParts.map((part, partIdx) => {
              const colorOptions = [
                { value: 'emerald', label: '초록 (목관)' },
                { value: 'amber', label: '주황 (금관)' },
                { value: 'rose', label: '분홍 (타악기)' },
              ];
              return (
                <div key={partIdx} className="rounded-lg border border-border bg-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">
                      {part.name || `파트 ${partIdx + 1}`}
                    </h4>
                    <Button variant="ghost" size="sm" onClick={() => removePart(partIdx)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="mr-1 h-4 w-4" /> 파트 삭제
                    </Button>
                  </div>

                  {/* 파트 기본 정보 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">파트명</Label>
                      <Input value={part.name} onChange={(e) => updatePart(partIdx, 'name', e.target.value)} placeholder="예: 목관 파트" />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">영문명</Label>
                      <Input value={part.englishName} onChange={(e) => updatePart(partIdx, 'englishName', e.target.value)} placeholder="예: Woodwind" />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">총 인원</Label>
                      <Input type="number" value={part.totalMembers} onChange={(e) => updatePart(partIdx, 'totalMembers', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">색상</Label>
                      <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={part.color}
                        onChange={(e) => updatePart(partIdx, 'color', e.target.value)}
                      >
                        {colorOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label className="text-xs text-muted-foreground">파트 설명</Label>
                    <Input value={part.description} onChange={(e) => updatePart(partIdx, 'description', e.target.value)} placeholder="파트 설명" />
                  </div>

                  {/* 악기 목록 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">악기 목록</Label>
                      <Button variant="outline" size="sm" onClick={() => addInstrument(partIdx)}>
                        <Plus className="mr-1 h-3 w-3" /> 악기 추가
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {part.instruments.map((inst, instIdx) => (
                        <div key={instIdx} className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                            <Input
                              value={inst.name}
                              onChange={(e) => updateInstrument(partIdx, instIdx, 'name', e.target.value)}
                              placeholder="악기명 (예: 플루트)"
                              className="h-8 text-sm"
                            />
                            <Input
                              type="number"
                              value={inst.count}
                              onChange={(e) => updateInstrument(partIdx, instIdx, 'count', parseInt(e.target.value) || 0)}
                              placeholder="인원"
                              className="h-8 text-sm"
                            />
                            <Input
                              value={inst.leader || ''}
                              onChange={(e) => updateInstrument(partIdx, instIdx, 'leader', e.target.value || null)}
                              placeholder="파트장 (선택)"
                              className="h-8 text-sm"
                            />
                          </div>
                          <Button variant="ghost" size="icon-sm" onClick={() => removeInstrument(partIdx, instIdx)} className="text-red-500 hover:text-red-600 shrink-0">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      {part.instruments.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-2">악기가 없습니다.</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveOrganization}
              disabled={saving}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              조직도 저장
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* --- History Dialogs --- */}

      {/* Create Dialog */}
      <Dialog open={isHistoryCreateOpen} onOpenChange={setIsHistoryCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>연혁 추가</DialogTitle>
            <DialogDescription>새로운 연혁 항목을 추가합니다.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="h-year">연도</Label>
                <Input
                  id="h-year"
                  type="number"
                  placeholder="예: 2024"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="h-month">월 (선택)</Label>
                <Input
                  id="h-month"
                  type="number"
                  min="1"
                  max="12"
                  placeholder="예: 11"
                  value={formMonth}
                  onChange={(e) => setFormMonth(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="h-content">내용</Label>
              <Textarea
                id="h-content"
                placeholder="연혁 내용을 입력하세요"
                rows={3}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="h-highlight"
                className="h-4 w-4"
                checked={formHighlight}
                onChange={(e) => setFormHighlight(e.target.checked)}
              />
              <Label htmlFor="h-highlight" className="font-normal">
                주요 이벤트로 강조 표시
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryCreateOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleHistoryCreate}
              disabled={saving || !formYear || !formContent.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isHistoryEditOpen} onOpenChange={setIsHistoryEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>연혁 수정</DialogTitle>
            <DialogDescription>연혁 항목을 수정합니다.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="he-year">연도</Label>
                <Input
                  id="he-year"
                  type="number"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="he-month">월 (선택)</Label>
                <Input
                  id="he-month"
                  type="number"
                  min="1"
                  max="12"
                  value={formMonth}
                  onChange={(e) => setFormMonth(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="he-content">내용</Label>
              <Textarea
                id="he-content"
                rows={3}
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="he-highlight"
                className="h-4 w-4"
                checked={formHighlight}
                onChange={(e) => setFormHighlight(e.target.checked)}
              />
              <Label htmlFor="he-highlight" className="font-normal">
                주요 이벤트로 강조 표시
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryEditOpen(false)}>
              취소
            </Button>
            <Button
              onClick={handleHistoryEdit}
              disabled={saving || !formYear || !formContent.trim()}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isHistoryDeleteOpen} onOpenChange={setIsHistoryDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>연혁 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 연혁 항목을 삭제하시겠습니까?
              <br />
              <span className="font-medium text-foreground">
                &quot;{selectedHistory?.year}년 {selectedHistory?.month ? `${selectedHistory.month}월` : ''} - {selectedHistory?.content}&quot;
              </span>
              <br />
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryDeleteOpen(false)}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleHistoryDelete} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
