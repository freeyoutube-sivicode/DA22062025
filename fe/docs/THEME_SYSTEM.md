# BMW CAR DEALERSHIP - THEME SYSTEM DOCUMENTATION

## **TỔNG QUAN**

Hệ thống theme hoàn chỉnh cho ứng dụng BMW Car Dealership Frontend với 5 theme có sẵn và khả năng tùy chỉnh màu sắc. Theme system được thiết kế để thay đổi màu sắc toàn bộ ứng dụng từ một điểm control duy nhất.

## **CẤU TRÚC HỆ THỐNG**

### **1. Core Files**

```
src/
├── types/theme.ts              # Type definitions cho theme
├── styles/
│   ├── themes.ts              # Theme configurations & presets
│   ├── theme-variables.scss   # SCSS variables với CSS custom properties
│   ├── theme-global.scss      # Global CSS overrides với highest specificity
│   └── main.scss              # Import theme-global.scss ở cuối file
├── contexts/ThemeContext.tsx   # React context cho theme management
├── utils/theme.ts             # Theme utility functions
└── components/ThemeController.tsx # UI component cho theme settings
```

### **2. Component Integration**

- **AdminLayout.tsx**: Theme controller chỉ hiển thị cho admin users
- **MainLayout.tsx**: Theme integration cho user pages
- **Header.tsx**: Clean component không có inline styles
- **Footer.tsx**: Clean component không có inline styles

## **THEME CONFIGURATIONS**

### **Available Themes**

1. **SiVi CAR** (Default) - Primary: `#059669` (Green)
2. **BMW Classic** - Primary: `#0066b1` (BMW Blue)
3. **Luxury** - Primary: `#8b5a3c` (Bronze)
4. **Sport** - Primary: `#c41e3a` (Red)
5. **Elegant** - Primary: `#4c516d` (Navy)

### **Theme Structure**

```typescript
interface Theme {
  name: string;
  colors: {
    palette: {
      primary: string; // Main brand color
      primaryLight: string; // Lighter variant
      primaryDark: string; // Darker variant
      secondary: string; // Secondary brand color
      secondaryLight: string; // Secondary lighter
    };
    text: {
      primary: string; // Main text color
      secondary: string; // Secondary text
      white: string; // White text
    };
    background: {
      primary: string; // Main background
      light: string; // Light background
    };
    surface: {
      primary: string; // Surface colors
      secondary: string;
      border: string; // Border color
    };
  };
  // typography, spacing, borderRadius, shadows, transitions, breakpoints
}
```

## **CSS CUSTOM PROPERTIES**

### **Generated Variables**

Theme context tự động generate CSS custom properties:

```css
:root {
  --theme-primary: #059669;
  --theme-primary-light: #10b981;
  --theme-primary-dark: #047857;
  --theme-secondary: #374151;
  --theme-secondary-light: #6b7280;
  --theme-text-primary: #1f2937;
  --theme-text-secondary: #6b7280;
  --theme-text-white: #ffffff;
  --theme-bg-primary: #ffffff;
  --theme-bg-light: #f9fafb;
  --theme-surface-primary: #ffffff;
  --theme-surface-secondary: #f3f4f6;
  --theme-border: #e5e7eb;
  /* ... và nhiều variables khác */
}
```

## **CSS OVERRIDE SYSTEM**

### **Highest Specificity Approach**

File `theme-global.scss` sử dụng specificity cao nhất để override tất cả styles:

```scss
// CRITICAL: Import theme-global.scss CUỐI CÙNG trong main.scss
@import "./theme-global";

// Header override với multiple selectors
html body div.header,
html body header.header,
html body .header {
  background-color: var(--theme-bg-primary, #ffffff) !important;
  border-bottom: 1px solid var(--theme-border, #e0e0e0) !important;
  transition: all 0.3s ease !important;
}

// Footer override
html body .footer {
  background-color: var(--theme-secondary, #{$color-secondary}) !important;
  color: var(--theme-text-white, #ffffff) !important;
  transition: all 0.3s ease !important;
}

// Components với clean structure
html body .header__auth-bar,
html body header .header__auth-bar,
html body div .header__auth-bar {
  background-color: var(--theme-secondary, #{$color-secondary}) !important;
  color: var(--theme-text-white, #ffffff) !important;
}
```

### **Import Order**

```scss
// main.scss - IMPORT ORDER QUAN TRỌNG
@import "./theme-variables"; // Đầu tiên
// ... other styles ...
@import "./theme-global"; // CUỐI CÙNG để override tất cả
```

## **REACT COMPONENT STRUCTURE**

### **ThemeProvider Integration**

```tsx
// App.tsx
<Provider store={store}>
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AntdThemeProvider>
          <Routes>...</Routes>
        </AntdThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
</Provider>
```

### **Theme Controller Access**

```tsx
// AdminLayout.tsx - Theme controller chỉ cho admin
{
  user?.Role === "admin" && <ThemeController />;
}

// MainLayout.tsx - Theme integration cho user pages
const { theme } = useTheme();
return (
  <div
    style={{
      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,
      transition: "all 0.3s ease",
    }}
  >
    {children}
  </div>
);
```

### **Clean Component Pattern**

Components sử dụng className thuần túy, không có inline styles:

```tsx
// Header.tsx - Clean structure
return (
  <header className="header">
    <div className="header__auth-bar">
      <div className="header__auth-links">
        <Link to="/login" className="header__auth-link">
          Đăng nhập
        </Link>
      </div>
    </div>
    <div className="header__main-bar">
      <nav className="header__nav">
        <Link to="/" className="header__nav-link">
          Trang chủ
        </Link>
      </nav>
    </div>
  </header>
);
```

## **THEME FUNCTIONS**

### **Core Functions**

```typescript
// useTheme hook
const { theme, setTheme, updatePrimaryColor, resetTheme } = useTheme();

// Theme switching
setTheme("bmwClassic");

// Custom color
updatePrimaryColor("#ff0000");

// Reset to default
resetTheme();
```

### **Utility Functions**

```typescript
// theme.ts utilities
lightenColor(color: string, amount: number): string
darkenColor(color: string, amount: number): string
getContrastColor(color: string): string
applyThemeToDocument(theme: Theme): void
```

## **ANT DESIGN INTEGRATION**

### **AntdThemeProvider**

```tsx
const AntdThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  const antdTheme = {
    token: {
      colorPrimary: theme.colors.palette.primary,
      colorSuccess: theme.colors.palette.primaryLight,
      colorInfo: theme.colors.palette.primary,
      borderRadius: theme.borderRadius.default,
      // Auto-sync với theme system
    },
  };

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
};
```

## **THEME CONTROLLER UI**

### **Features**

- **Floating settings button**: Chỉ hiển thị cho admin users
- **Theme selection dropdown**: 5 preset themes với preview
- **Custom color picker**: Color wheel với 20 preset colors
- **Live preview**: Thay đổi ngay lập tức
- **Reset functionality**: Về theme mặc định
- **Vietnamese interface**: Tất cả text bằng tiếng Việt

### **Preset Colors**

```typescript
const presetColors = [
  "#059669",
  "#0066b1",
  "#8b5a3c",
  "#c41e3a",
  "#4c516d",
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#65a30d",
  "#059669",
  "#0891b2",
  "#0284c7",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#c026d3",
  "#db2777",
  "#e11d48",
  "#dc2626",
];
```

## **LOCALIZATION**

### **Vietnamese Labels**

```typescript
const themeLabels = {
  siviCar: "SiVi CAR",
  bmwClassic: "BMW Cổ Điển",
  luxury: "Sang Trọng",
  sport: "Thể Thao",
  elegant: "Thanh Lịch",
};
```

## **STORAGE & PERSISTENCE**

### **LocalStorage Integration**

```typescript
// Auto-save theme preferences
localStorage.setItem("selectedTheme", themeName);
localStorage.setItem("customPrimaryColor", color);

// Auto-load on app start
useEffect(() => {
  const savedTheme = localStorage.getItem("selectedTheme");
  const savedColor = localStorage.getItem("customPrimaryColor");

  if (savedColor) {
    updatePrimaryColor(savedColor);
  } else if (savedTheme) {
    setTheme(savedTheme);
  }
}, []);
```

## **RESPONSIVE & PERFORMANCE**

### **Smooth Transitions**

```scss
// Global transition cho mọi element
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

// Optimized cho theme switching
.header,
.footer,
.main-content {
  transition:
    background-color 0.3s ease,
    color 0.3s ease !important;
}
```

### **Static Scrollbar**

```scss
// Scrollbar không thay đổi theo theme để tránh lòe loẹt
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;

  &:hover {
    background: #a8a8a8;
  }
}
```

## **TROUBLESHOOTING**

### **Common Issues**

#### **Theme không thay đổi màu**

1. Kiểm tra import order trong `main.scss`
2. Đảm bảo `theme-global.scss` được import cuối cùng
3. Check CSS specificity và `!important` rules
4. Verify theme-variables được generate đúng

#### **CSS Compilation Errors**

1. `color.adjust()` functions không work với CSS custom properties
2. Thay thế bằng static colors hoặc theme variables
3. Use script `fix-sass-errors.js` để auto-fix

#### **Performance Issues**

1. Limit số lượng CSS custom properties
2. Use CSS containment cho theme switching
3. Debounce theme changes khi dùng color picker

## **DEVELOPMENT WORKFLOW**

### **Adding New Theme**

1. Add theme configuration trong `themes.ts`
2. Add theme name trong `themeLabels`
3. Test với ThemeController UI
4. Verify tất cả components apply theme correctly

### **Extending Color Palette**

1. Update `ColorPalette` interface trong `types/theme.ts`
2. Add new variables trong `theme-variables.scss`
3. Update theme generation functions
4. Add CSS overrides trong `theme-global.scss`

### **Component Theme Integration**

1. Use clean className structure (no inline styles)
2. Rely on CSS override system từ `theme-global.scss`
3. For custom components, add CSS overrides với high specificity
4. Test với tất cả 5 preset themes

## **TESTING CHECKLIST**

### **Theme Switching Test**

- [ ] Header background thay đổi theo theme
- [ ] Footer background thay đổi theo theme
- [ ] Navigation links hover colors
- [ ] Button colors update correctly
- [ ] Ant Design components sync với theme
- [ ] Custom color picker hoạt động
- [ ] LocalStorage persistence works
- [ ] Admin-only access control
- [ ] Mobile responsive theme switching

### **Performance Test**

- [ ] Smooth transitions không lag
- [ ] No CSS compilation errors
- [ ] No console warnings
- [ ] Fast theme switching (<100ms)
- [ ] Memory usage stable

---

## **QUICK REFERENCE**

### **Key Commands**

```bash
# Start development
npm run dev

# Build production
npm run build

# Fix SASS compilation errors
node fix-sass-errors.js
```

### **Important Files to Check**

1. `src/styles/main.scss` - Import order
2. `src/styles/theme-global.scss` - CSS overrides
3. `src/contexts/ThemeContext.tsx` - Theme logic
4. `src/components/ThemeController.tsx` - UI controls

### **CSS Debug Pattern**

```scss
// Test color để verify override hoạt động
html body .header {
  background-color: red !important; /* Test color */
}
html body .footer {
  background-color: blue !important; /* Test color */
}
// Nếu thay đổi được → CSS override works → Switch to theme variables
```

### **Current Implementation Status**

#### ✅ **Working Components**

- Footer: Theme colors apply correctly
- Theme Controller: Fully functional với admin-only access
- Theme switching: Live updates với localStorage persistence
- CSS Override System: High specificity approach hoạt động

#### 🔧 **In Progress**

- Header: Cần multiple selectors để override main.scss styles
- Component clean-up: Removing inline styles khỏi tất cả components

#### **Critical Implementation Notes**

1. **Import Order**: `theme-global.scss` PHẢI import cuối cùng trong `main.scss`
2. **CSS Specificity**: Sử dụng multiple selectors `html body div.header, html body header.header, html body .header`
3. **Test Approach**: Dùng test colors (red/blue) để verify override trước khi apply theme variables
4. **Clean Components**: Header.tsx và Footer.tsx đã được clean không có inline styles

---

## **SUPPORT & MAINTENANCE**

### **For Future Development**

Khi gặp issues với theme system:

1. **Kiểm tra file này** để hiểu architecture
2. **Verify import order** trong main.scss
3. **Test với debug colors** trước khi apply theme variables
4. **Check CSS specificity** bằng browser dev tools
5. **Ensure clean component structure** không có inline styles conflicts

### **Architecture Decisions**

- **CSS Override Approach**: Chọn high-specificity thay vì CSS-in-JS để performance tốt hơn
- **Multiple Selectors**: Để handle different HTML structures (div.header, header.header)
- **Static Scrollbar**: Không thay đổi theo theme để tránh visual jarring
- **Admin-Only Access**: Theme controller chỉ admin để avoid user confusion

Hệ thống theme này được thiết kế để scalable, maintainable và user-friendly với complete admin control và automatic persistence.
