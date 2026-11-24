# Frontend Design Specification

## 1. Design Direction

Build a modern, clean banking dashboard inspired by the provided reference image.

The interface should feel:

- Professional and trustworthy
- Spacious and easy to scan
- Bright and minimalist
- Financially focused rather than decorative
- Suitable for both customer and administrator portals

The main visual style is a pale-gray application canvas, white cards and panels, thin neutral borders, subtle shadows, and restrained use of purple and green accents.

## 2. Tailwind CSS Setup

Use Tailwind CSS with the React frontend. Prefer utility classes and semantic component composition over custom CSS.

Recommended setup:

- Tailwind CSS 4 with Vite, or Tailwind CSS 3 if the project toolchain requires a stable PostCSS setup
- Install Lucide React for interface icons
- Use CSS custom properties for values shared with third-party components such as charts
- Keep reusable combinations in React components rather than a large collection of custom utility classes

### Tailwind Theme Tokens

Define these design tokens in Tailwind theme configuration or a shared CSS theme layer:

```js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2EFFC',
          500: '#6C4FF8',
          600: '#5A3DE0'
        },
        canvas: '#F4F5F7',
        ink: '#17181C',
        muted: '#667085',
        line: '#EAECF0'
      },
      borderRadius: {
        card: '12px',
        control: '8px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04)',
        modal: '0 16px 40px rgba(16, 24, 40, 0.16)'
      }
    }
  }
}
```

Prefer utility classes such as `rounded-card`, `shadow-card`, `border-line`, and `text-muted` once configured.

### Tailwind Conventions

- Use `2`, `4`, `5`, `6`, `8`, and `12` spacing units consistently
- Use `rounded-lg` or the custom `rounded-control` for controls
- Use `rounded-xl` or `rounded-card` for cards
- Use `bg-white`, `border-gray-200`, and `text-slate-*` for neutral surfaces
- Use `text-brand-500` for primary accents and `bg-brand-50` for selected states
- Use `text-emerald-600` for positive values and `text-red-600` for negative values
- Use `dark:` variants only if a dark theme is deliberately added
- Use arbitrary values only for precise chart or layout measurements
- Extract repeated UI patterns into components such as `Button`, `Card`, `Input`, `Badge`, and `Table`

## 3. Visual Foundation

### Color Palette

| Purpose | Recommended value | Usage |
|---|---|---|
| Primary | `#6C4FF8` | Main buttons, selected navigation, chart emphasis |
| Primary hover | `#5A3DE0` | Hover state for primary actions |
| Primary soft | `#F2EFFC` | Selected items, soft highlights |
| Page background | `#F4F5F7` | Outer application background |
| Card background | `#FFFFFF` | Panels, tables, dialogs |
| Text primary | `#17181C` | Headings and important values |
| Text secondary | `#667085` | Labels and supporting text |
| Text muted | `#98A2B3` | Placeholder and tertiary text |
| Border | `#EAECF0` | Card and table borders |
| Success | `#17B26A` | Deposits and positive balances |
| Success soft | `#ECFDF3` | Positive status backgrounds |
| Danger | `#F04438` | Withdrawals and errors |
| Danger soft | `#FEF3F2` | Negative status backgrounds |
| Warning | `#F79009` | Pending or attention states |
| Neutral dark | `#344054` | Secondary controls and icons |

Do not overuse color. Purple indicates primary actions and selected states; green and red indicate financial movement; all other content remains neutral.

### Typography

Recommended font: **Inter**, with a system sans-serif fallback:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
```

Use these text styles:

| Style | Size | Weight |
|---|---:|---:|
| Page title | 24px | 700 |
| Section title | 14px | 700 |
| Card title | 16px | 700 |
| Body | 14px | 400 |
| Table text | 13px | 500 |
| Label | 12px | 600 |
| Caption | 11px | 500 |
| Amount large | 20px | 700 |

Use tabular numerals for balances, amounts, and transaction tables.

### Spacing and Shape

- Main page padding: `24px`
- Card padding: `20px`
- Grid gutters: `16px`
- Base spacing unit: `4px`
- Card radius: `12px`
- Button radius: `8px`
- Input radius: `8px`
- Icon button radius: `8px`
- Badge radius: `999px`
- Card shadows: very subtle; avoid heavy visual effects

## 3. Application Layout

### Desktop Shell

The desktop interface should use a fixed left navigation rail and a large content area.

```text
┌──────────────────────────────────────────────────────────┐
│ Sidebar  │  Page header                                  │
│          │                                               │
│          │  Main content cards                          │
│          │                                               │
└──────────────────────────────────────────────────────────┘
```

- Sidebar width: `72px` in the compact reference style
- Header height: `72px`
- Maximum content width: `1440px`
- Sidebar remains fixed while the content area scrolls
- Use a white shell on a light-gray page background

### Mobile Layout

- Replace the left rail with a fixed bottom navigation or slide-out drawer
- Keep page titles and primary actions visible
- Stack dashboard cards vertically
- Convert wide tables into horizontally scrollable tables or transaction cards
- Use full-width primary buttons for destructive or important actions

## 4. Navigation

### Sidebar

Use rounded icon-only navigation items, arranged vertically.

Recommended customer navigation items:

1. Dashboard
2. Accounts
3. Deposits and withdrawals
4. Transfers
5. Transactions
6. Statements
7. Profile
8. Settings

Recommended administrator navigation items:

1. Dashboard
2. Customers
3. Accounts
4. Transactions
5. Interest rates

Navigation item states:

- Default: neutral gray icon
- Hover: light-gray background
- Active: pale-purple background with purple icon
- Optional tooltip: action name shown on hover
- Focus: visible purple outline for keyboard navigation

### Header

Each page header should contain:

- Page title on the left
- Search field or contextual action in the center/right
- Primary action button on the right
- Optional user avatar and profile menu

Example: **My accounts** with an export report button on the right.

## 5. Shared Components

### AppShell

- White sidebar and main panel
- Light-gray body background
- Thin border separators
- Consistent page padding
- Rounded outer application frame on very wide screens

### Card

A card is the default container for page sections.

Properties:

- White background
- `1px` border
- `12px` radius
- `20px` padding
- Subtle border shadow or no shadow
- Avoid nested cards unless necessary

### Primary Button

- Purple background
- White text
- Medium size: `40px` height
- `8px` radius
- Weight `600`
- Optional icon at the left
- Disabled state with reduced opacity

### Secondary Button

- White background
- `#D0D5DD` border
- Dark text
- Purple border or text on hover

### Icon Button

- `36px × 36px`
- Neutral icon
- Rounded square or circular shape
- Light-gray hover state
- Tooltip for icon meaning

### Search Field

- Placeholder text is clearly visible
- Search icon on the left
- Keyboard hint on the right when appropriate
- `40px` height
- White background with neutral border
- Full width on mobile

### Badge

Use a badge for status or account type:

- Active: green text and green-soft background
- Frozen: warning text and warning-soft background
- Closed: red text and red-soft background
- Pending: warning text and neutral/warning-soft background

### Table

Use compact, highly readable rows.

- Header text in gray
- Header background: white or very pale gray
- Row height: `56px–64px`
- Thin horizontal separators
- Right-align numeric and amount columns
- Show action icons at the end of each row
- Hover row: very light-gray background

### Dialog / Modal

Use for confirmations and focused forms:

- Centered overlay
- White panel
- `12px` radius
- Maximum width based on content
- Header, scrollable body, and fixed footer
- Primary action aligned at the bottom right
- Cancel action to the left
- Backdrop: translucent dark neutral

### Toast Notification

- Bottom-right on desktop
- Top or bottom on mobile
- Success, error, warning, or information variants
- Include a concise title and optional supporting text
- Auto-dismiss after 4–6 seconds
- Do not stack too many notifications

## 6. Balance and Chart Component

### Balance Over Time Card

A large card should show a balance trend with a clean line chart.

Layout:

- Section title: `Balance over time`
- Period selector in the top-right: `12 months`, `30 days`, `7 days`, `24 hours`
- Two or more lines for primary account balances and comparison values
- Purple line for the main balance
- Neutral or muted line for secondary totals
- Hover tooltip with date and amount
- Labels at the top or end of each line
- Horizontal dotted grid lines
- Minimal or no Y-axis labels
- Soft area shading beneath the main line is optional

Chart behavior:

- Responsive to card width
- Smooth line interpolation
- Clear hover marker and vertical guide line
- One accessible text summary for screen readers
- Month or day labels based on selected period

## 7. Transactions Table

The transactions section should replicate the visual density of the reference image.

Columns:

1. Merchant or transaction description
2. Amount
3. Account
4. Status or date
5. Action

Transaction rows should include:

- Circular brand icon or neutral fallback icon
- Merchant name and optional category
- Positive amount in green with a leading `+`
- Negative amount in neutral or red with a leading `−`
- Account card brand and masked account number
- Expiry or transaction date under the masked account number
- Edit or details icon on the right

Search transactions should:

- Filter by merchant, account, date, status, and amount
- Update results immediately or after a short debounce
- Use an empty state when no transaction matches
- Preserve the selected filters visually

## 8. Customer Pages

### Login

- Split layout on desktop
- Product value or abstract banking visual on the left
- Compact login card on the right
- Email and password fields
- Password visibility control
- Remember me checkbox
- Forgot password link
- Primary `Sign in` button
- Registration link

### Register

- Progressively disclose personal information
- Full name, email, password, and confirm password
- Inline password requirements
- Inline validation and accessible error messages
- Terms and privacy acknowledgement

### Dashboard

Include:

- Balance over time chart
- Account summary cards
- Recent transactions
- Quick actions for deposit, withdraw, and transfer
- Account status and available balance

### Accounts

Display:

- Account name and type
- Account number or masked number
- Available balance
- Account status
- View and statement actions
- Option to create an account

### Deposit

Collect:

- Account
- Amount
- Optional description

Show:

- Confirmation summary
- Available balance after deposit
- Success reference number

### Withdrawal

Collect:

- Account
- Amount
- Optional description

Validate:

- Positive amount
- Sufficient available balance
- Account is active

### Transfer

Collect:

- Source account
- Destination account number
- Recipient name
- Amount
- Optional description

Before submission:

- Confirm the recipient
- Recheck available balance
- Prevent self-transfers

### Transaction History

Include:

- Search
- Date filter
- Type filter
- Status filter
- Export or download action
- Paginated table or infinite scrolling

### Account Statement

Include:

- Account selector
- Start and end date
- Opening balance
- Closing balance
- Full transaction list
- PDF download action
- Printable layout

## 9. Administrator Pages

### Administrator Dashboard

- Total customers
- Total accounts
- Transaction volume
- Recent system activity
- Status breakdown
- Search and pagination

### Customer Management

- Customer name
- Email
- Registration date
- Account count
- Status or role
- View customer details

### Account Management

- Customer
- Account number
- Account type
- Balance
- Status
- Activate or freeze action
- Confirmation dialog before status changes

### Transaction Monitoring

- Global transaction search
- Filter by account, customer, type, date, and status
- Read-only details view
- Export capability

### Interest Configuration

- Annual interest rate input
- Calculation period
- Eligible account types
- Preview of the next interest calculation
- Confirmation before applying changes

## 10. Forms and Validation

Use a consistent form structure:

- Label above the field
- Helpful text below the field when needed
- Inline error below invalid fields
- Red border and error icon for invalid state
- Disabled submit button while submitting
- Loading label or spinner during API calls
- Preserve entered values after validation errors

Validation rules:

- All monetary values must be positive and use a maximum of two decimal places
- Account numbers must match backend formats
- Email fields must use valid email formatting
- Password fields must show strength and requirements
- Required fields must not rely only on visual indicators
- Never allow transfers to the same account

## 11. Loading, Empty, and Error States

### Loading

- Use skeleton blocks for cards and table rows
- Keep headers and controls visible
- Do not replace the entire page with a blank loader
- Disable duplicate submissions

### Empty State

Include:

- Small icon or illustration
- Clear title
- Short explanation
- One relevant action

Examples:

- “No accounts yet — Create your first account.”
- “No transactions found — Try changing the filters.”

### Error State

- Describe the problem without exposing internal details
- Offer a retry action where appropriate
- Preserve navigation and previously available content
- Use accessible alert regions

## 12. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| 1280px and above | Full sidebar, three-column dashboard sections |
| 1024px | Compact sidebar, two-column dashboard |
| 768px | Hidden sidebar or drawer, stacked cards |
| 480px and below | Bottom navigation, single-column content, full-width actions |

Table strategy:

- Above 768px: full table layout
- At 768px and below: transform into cards or retain only essential columns
- Always keep account balance and transaction amount visible

## 13. Accessibility

- Maintain WCAG 2.2 AA contrast
- Use semantic HTML landmarks
- Connect labels to inputs
- Add accessible names to icon-only buttons
- Use visible keyboard focus states
- Do not communicate status using color alone
- Use `aria-live` for transaction and form result notifications
- Ensure modals trap and restore keyboard focus
- Respect `prefers-reduced-motion`
- Avoid relying on a tooltip for essential information

## 14. Motion

Use short, purposeful motion:

- Hover transitions: `120ms`
- Modal and drawer entry: `180ms`
- Toast entry: `180ms`
- Chart transitions: `240ms`
- Use ease-out curves
- Avoid motion on decorative elements

## 15. React Implementation Guidelines

### Suggested Structure

```text
src/
  app/
    App.jsx
    routes.jsx
  components/
    layout/
    ui/
    charts/
    transactions/
    accounts/
  features/
    auth/
    dashboard/
    accounts/
    transactions/
    statements/
    admin/
  hooks/
  services/
  utils/
  styles/
```

### Component Principles

- Build reusable primitives before page-specific components
- Keep API calls in services or feature hooks
- Separate presentational components from data-fetching components
- Use one shared table component for application-wide consistency
- Centralize design tokens in a theme or CSS variables
- Build loading and error states into each data-driven component
- Reuse form components and validation logic

### Routing

- `/login`
- `/register`
- `/dashboard`
- `/accounts`
- `/accounts/:accountId`
- `/deposit`
- `/withdraw`
- `/transfer`
- `/transactions`
- `/statements`
- `/profile`

Administrator routes:

- `/admin/dashboard`
- `/admin/customers`
- `/admin/accounts`
- `/admin/transactions`
- `/admin/interest`

## 16. Visual Quality Checklist

Before implementation, verify:

- The interface is airy and not overcrowded
- Purple is used as an action or selection accent, not everywhere
- Financial amounts are easy to scan
- Table rows have consistent spacing
- Cards use a consistent border and radius
- Primary actions are visually dominant
- Negative values are readable and do not rely only on color
- Mobile layouts preserve the most important information
- Loading and empty states match the rest of the design
- All interactive elements have clear hover and focus states
