import { test, expect, Page } from '@playwright/test';

const SCREENSHOT_DIR = 'tests/e2e/screenshots';

test.describe('예산윈드오케스트라 관리자 기능 테스트', () => {
  test.describe.configure({ mode: 'serial' });

  // --------------------------------------------------
  // STEP 1: 공지사항 목록 페이지 확인
  // --------------------------------------------------
  test('Step 1: 공지사항 목록 페이지 (/board/notice) 정상 표시 확인', async ({ page }) => {
    await page.goto('/board/notice');
    await page.waitForLoadState('networkidle');

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/01-notice-list.png`,
      fullPage: true,
    });

    // 페이지 제목이나 헤더 확인
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible({ timeout: 10000 });

    // 게시글 목록이 있거나 "등록된 공지사항이 없습니다" 메시지가 있어야 함
    const hasPosts = await page.locator('a[href*="/board/notice/"]').count();
    const emptyMessage = page.locator('text=등록된 공지사항이 없습니다');

    if (hasPosts > 0) {
      console.log(`[PASS] 공지사항 목록에 ${hasPosts}개의 게시글이 표시됩니다.`);
    } else {
      const isEmptyVisible = await emptyMessage.isVisible().catch(() => false);
      if (isEmptyVisible) {
        console.log('[INFO] 공지사항이 비어 있습니다 (빈 상태 메시지 표시됨).');
      } else {
        console.log('[WARN] 게시글도 없고 빈 상태 메시지도 보이지 않습니다.');
      }
    }

    // 페이지 로드 자체가 에러 없이 완료되었는지 확인
    const pageTitle = await page.title();
    console.log(`[INFO] 페이지 타이틀: "${pageTitle}"`);
  });

  // --------------------------------------------------
  // STEP 2: 관리자 게시판 페이지 확인
  // --------------------------------------------------
  test('Step 2: 관리자 게시판 페이지 (/admin/posts) 정상 표시 확인', async ({ page }) => {
    await page.goto('/admin/posts');
    await page.waitForLoadState('networkidle');

    // 로딩 스피너가 사라지길 기다림
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {
      console.log('[INFO] 로딩 스피너가 없거나 이미 사라짐');
    });

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/02-admin-posts.png`,
      fullPage: true,
    });

    // "게시판 관리" 제목 확인
    const pageHeader = page.locator('h1');
    await expect(pageHeader).toBeVisible({ timeout: 10000 });
    const headerText = await pageHeader.textContent();
    console.log(`[INFO] 관리자 페이지 제목: "${headerText}"`);

    // "공지사항 작성" 버튼 존재 확인
    const createButton = page.locator('button:has-text("공지사항 작성"), button:has-text("새 글 작성")');
    const createButtonVisible = await createButton.isVisible().catch(() => false);
    console.log(`[INFO] 글 작성 버튼 표시 여부: ${createButtonVisible}`);

    // 테이블/리스트가 보이거나 빈 상태인지 확인
    const tableRows = await page.locator('table tbody tr, [class*="table"] [class*="row"]').count().catch(() => 0);
    console.log(`[INFO] 테이블 행 수: ${tableRows}`);
  });

  // --------------------------------------------------
  // STEP 3 & 4: 새 글 작성 버튼 클릭 및 테스트 글 작성
  // --------------------------------------------------
  test('Step 3-4: 새 글 작성 - 테스트 공지 등록', async ({ page }) => {
    await page.goto('/admin/posts');
    await page.waitForLoadState('networkidle');

    // 로딩 완료 대기
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    // "공지사항 작성" 버튼 클릭
    const createButton = page.locator('button:has-text("공지사항 작성"), button:has-text("새 글 작성")');
    await expect(createButton).toBeVisible({ timeout: 10000 });

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/03-before-create-click.png`,
      fullPage: true,
    });

    await createButton.click();

    // 다이얼로그 모달이 열리길 대기
    const dialog = page.locator('[role="dialog"], [class*="DialogContent"]');
    await expect(dialog).toBeVisible({ timeout: 10000 });

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/04-create-dialog-open.png`,
      fullPage: true,
    });

    // 제목 입력
    const titleInput = page.locator('#title, input[placeholder*="제목"]');
    await expect(titleInput).toBeVisible({ timeout: 5000 });
    await titleInput.fill('테스트 공지');

    // 내용 입력
    const contentTextarea = page.locator('#content, textarea[placeholder*="내용"]');
    await expect(contentTextarea).toBeVisible({ timeout: 5000 });
    await contentTextarea.fill('테스트 내용입니다');

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/05-create-form-filled.png`,
      fullPage: true,
    });

    // "등록" 버튼 클릭
    const submitButton = page.locator('button:has-text("등록")');
    await expect(submitButton).toBeEnabled({ timeout: 5000 });
    await submitButton.click();

    // 다이얼로그가 닫히길 기다림
    await expect(dialog).toBeHidden({ timeout: 15000 });

    // 로딩 후 목록 갱신 대기
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Supabase 반영 대기

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/06-after-create.png`,
      fullPage: true,
    });

    console.log('[PASS] 테스트 공지 글 작성 완료');
  });

  // --------------------------------------------------
  // STEP 5: 작성된 글이 목록에 반영되는지 확인
  // --------------------------------------------------
  test('Step 5: 작성된 글이 목록에 반영되는지 확인', async ({ page }) => {
    await page.goto('/admin/posts');
    await page.waitForLoadState('networkidle');

    // 로딩 완료 대기
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    // "테스트 공지" 텍스트가 목록에 있는지 확인
    const testPostTitle = page.locator('text=테스트 공지');
    const isPostVisible = await testPostTitle.isVisible({ timeout: 10000 }).catch(() => false);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/07-verify-created-post.png`,
      fullPage: true,
    });

    if (isPostVisible) {
      console.log('[PASS] "테스트 공지" 글이 관리자 목록에 정상적으로 표시됩니다.');
    } else {
      console.log('[FAIL] "테스트 공지" 글이 관리자 목록에 보이지 않습니다.');
    }

    // 공개 페이지에서도 확인
    await page.goto('/board/notice');
    await page.waitForLoadState('networkidle');

    const publicPostTitle = page.locator('text=테스트 공지');
    const isPublicVisible = await publicPostTitle.isVisible({ timeout: 10000 }).catch(() => false);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/08-verify-public-notice.png`,
      fullPage: true,
    });

    if (isPublicVisible) {
      console.log('[PASS] "테스트 공지" 글이 공개 페이지에도 정상적으로 표시됩니다.');
    } else {
      console.log('[WARN] "테스트 공지" 글이 공개 페이지에 아직 표시되지 않습니다 (캐시/SSR 지연 가능).');
    }
  });

  // --------------------------------------------------
  // STEP 6: 작성한 글 수정 시도
  // --------------------------------------------------
  test('Step 6: 작성한 글 수정 시도', async ({ page }) => {
    await page.goto('/admin/posts');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    // "테스트 공지" 행의 더보기(MoreHorizontal) 버튼 클릭
    const testRow = page.locator('tr:has-text("테스트 공지"), [class*="row"]:has-text("테스트 공지"), div:has-text("테스트 공지")').first();

    // 더보기 버튼 (MoreHorizontal 아이콘을 가진 버튼)
    const moreButton = testRow.locator('button').last();

    // 만약 testRow를 찾지 못하면 전체에서 검색
    const isRowVisible = await testRow.isVisible().catch(() => false);

    if (!isRowVisible) {
      console.log('[WARN] 테스트 공지 행을 찾지 못했습니다. 전체 페이지에서 검색합니다.');
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/09-edit-row-not-found.png`,
        fullPage: true,
      });
      return;
    }

    await moreButton.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/09-dropdown-menu-open.png`,
      fullPage: true,
    });

    // "수정" 메뉴 항목 클릭
    const editMenuItem = page.locator('[role="menuitem"]:has-text("수정")');
    await expect(editMenuItem).toBeVisible({ timeout: 5000 });
    await editMenuItem.click();

    // 수정 다이얼로그 열림 확인
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 10000 });

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/10-edit-dialog-open.png`,
      fullPage: true,
    });

    // 기존 값이 채워져 있는지 확인
    const titleInput = page.locator('#edit-title, [role="dialog"] input');
    const titleValue = await titleInput.inputValue();
    console.log(`[INFO] 수정 다이얼로그 제목 값: "${titleValue}"`);

    // 제목 수정
    await titleInput.clear();
    await titleInput.fill('테스트 공지 (수정됨)');

    // 내용 수정
    const contentTextarea = page.locator('#edit-content, [role="dialog"] textarea');
    await contentTextarea.clear();
    await contentTextarea.fill('테스트 내용이 수정되었습니다.');

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/11-edit-form-modified.png`,
      fullPage: true,
    });

    // "저장" 버튼 클릭
    const saveButton = page.locator('[role="dialog"] button:has-text("저장")');
    await expect(saveButton).toBeEnabled({ timeout: 5000 });
    await saveButton.click();

    // 다이얼로그 닫힘 확인
    await expect(dialog).toBeHidden({ timeout: 15000 });

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/12-after-edit.png`,
      fullPage: true,
    });

    // 수정된 제목 확인
    const modifiedTitle = page.locator('text=테스트 공지 (수정됨)');
    const isModifiedVisible = await modifiedTitle.isVisible({ timeout: 10000 }).catch(() => false);

    if (isModifiedVisible) {
      console.log('[PASS] 글 수정이 정상적으로 반영되었습니다.');
    } else {
      console.log('[FAIL] 수정된 글 제목이 목록에 보이지 않습니다.');
    }
  });

  // --------------------------------------------------
  // STEP 7: 작성한 글 삭제 시도
  // --------------------------------------------------
  test('Step 7: 작성한 글 삭제 시도', async ({ page }) => {
    await page.goto('/admin/posts');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    // 수정된 글 또는 원본 글 행 찾기
    const testRow = page.locator('tr:has-text("테스트 공지"), [class*="row"]:has-text("테스트 공지"), div:has-text("테스트 공지")').first();
    const isRowVisible = await testRow.isVisible().catch(() => false);

    if (!isRowVisible) {
      console.log('[WARN] 테스트 공지 행을 찾을 수 없습니다.');
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/13-delete-row-not-found.png`,
        fullPage: true,
      });
      return;
    }

    // 더보기 버튼 클릭
    const moreButton = testRow.locator('button').last();
    await moreButton.click();
    await page.waitForTimeout(500);

    // "삭제" 메뉴 항목 클릭
    const deleteMenuItem = page.locator('[role="menuitem"]:has-text("삭제")');
    await expect(deleteMenuItem).toBeVisible({ timeout: 5000 });
    await deleteMenuItem.click();

    // 삭제 확인 다이얼로그 열림 확인
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 10000 });

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/13-delete-confirm-dialog.png`,
      fullPage: true,
    });

    // 경고 메시지 확인
    const warningText = page.locator('text=되돌릴 수 없습니다');
    const hasWarning = await warningText.isVisible().catch(() => false);
    console.log(`[INFO] 삭제 경고 메시지 표시: ${hasWarning}`);

    // "삭제" 버튼 클릭
    const confirmDeleteButton = page.locator('[role="dialog"] button:has-text("삭제")');
    await confirmDeleteButton.click();

    // 다이얼로그 닫힘 확인
    await expect(dialog).toBeHidden({ timeout: 15000 });

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/14-after-delete.png`,
      fullPage: true,
    });

    // 삭제된 글이 목록에서 사라졌는지 확인
    const deletedTitle = page.locator('text=테스트 공지');
    const isStillVisible = await deletedTitle.isVisible({ timeout: 3000 }).catch(() => false);

    if (!isStillVisible) {
      console.log('[PASS] 글이 정상적으로 삭제되었습니다.');
    } else {
      console.log('[FAIL] 삭제된 글이 여전히 목록에 보입니다.');
    }
  });

  // --------------------------------------------------
  // STEP 8: 관리자 공연 관리 페이지 확인
  // --------------------------------------------------
  test('Step 8: 관리자 공연 관리 페이지 (/admin/concerts) 확인', async ({ page }) => {
    await page.goto('/admin/concerts');
    await page.waitForLoadState('networkidle');

    // 로딩 완료 대기
    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/15-admin-concerts.png`,
      fullPage: true,
    });

    // 페이지 로드 확인 - 제목이나 컨텐츠 존재
    const heading = page.locator('h1, h2').first();
    const headingVisible = await heading.isVisible({ timeout: 10000 }).catch(() => false);

    if (headingVisible) {
      const headingText = await heading.textContent();
      console.log(`[PASS] 공연 관리 페이지 로드 성공. 제목: "${headingText}"`);
    } else {
      // 404 페이지인지 확인
      const notFoundText = page.locator('text=404, text=Not Found, text=찾을 수 없');
      const is404 = await notFoundText.isVisible().catch(() => false);
      if (is404) {
        console.log('[FAIL] 공연 관리 페이지가 존재하지 않습니다 (404).');
      } else {
        console.log('[WARN] 공연 관리 페이지의 제목을 찾을 수 없습니다.');
      }
    }

    // 에러 상태 확인
    const errorElement = page.locator('text=Error, text=에러, text=오류');
    const hasError = await errorElement.isVisible().catch(() => false);
    if (hasError) {
      console.log('[FAIL] 공연 관리 페이지에 에러가 있습니다.');
    }
  });

  // --------------------------------------------------
  // STEP 9: 관리자 갤러리 페이지 확인
  // --------------------------------------------------
  test('Step 9: 관리자 갤러리 페이지 (/admin/gallery) 확인', async ({ page }) => {
    await page.goto('/admin/gallery');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/16-admin-gallery.png`,
      fullPage: true,
    });

    const heading = page.locator('h1, h2').first();
    const headingVisible = await heading.isVisible({ timeout: 10000 }).catch(() => false);

    if (headingVisible) {
      const headingText = await heading.textContent();
      console.log(`[PASS] 갤러리 관리 페이지 로드 성공. 제목: "${headingText}"`);
    } else {
      const notFoundText = page.locator('text=404, text=Not Found');
      const is404 = await notFoundText.isVisible().catch(() => false);
      if (is404) {
        console.log('[FAIL] 갤러리 관리 페이지가 존재하지 않습니다 (404).');
      } else {
        console.log('[WARN] 갤러리 관리 페이지의 제목을 찾을 수 없습니다.');
      }
    }
  });

  // --------------------------------------------------
  // STEP 10: 관리자 단원 관리 페이지 확인
  // --------------------------------------------------
  test('Step 10: 관리자 단원 관리 페이지 (/admin/members) 확인', async ({ page }) => {
    await page.goto('/admin/members');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('.animate-spin', { state: 'detached', timeout: 15000 }).catch(() => {});

    await page.screenshot({
      path: `${SCREENSHOT_DIR}/17-admin-members.png`,
      fullPage: true,
    });

    const heading = page.locator('h1, h2').first();
    const headingVisible = await heading.isVisible({ timeout: 10000 }).catch(() => false);

    if (headingVisible) {
      const headingText = await heading.textContent();
      console.log(`[PASS] 단원 관리 페이지 로드 성공. 제목: "${headingText}"`);
    } else {
      const notFoundText = page.locator('text=404, text=Not Found');
      const is404 = await notFoundText.isVisible().catch(() => false);
      if (is404) {
        console.log('[FAIL] 단원 관리 페이지가 존재하지 않습니다 (404).');
      } else {
        console.log('[WARN] 단원 관리 페이지의 제목을 찾을 수 없습니다.');
      }
    }
  });
});
