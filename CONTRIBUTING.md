# Contributing to Portfolio Website

Thank you for your interest in contributing! 🎉

This is a personal portfolio project, but I welcome contributions, suggestions, and feedback.

---

## 🤝 Ways to Contribute

### 1. 🐛 Report Bugs

Found a bug? Please create an issue with:

- **Clear title**: "Bug: Navigation menu doesn't close on mobile"
- **Description**: What happened vs. what you expected
- **Steps to reproduce**: How can I see the bug?
- **Environment**: Browser, OS, device
- **Screenshots**: If applicable

**Example:**
```
Title: Bug: Contact form doesn't submit on Safari
Description: Clicking submit button shows no response
Steps: 1. Open site in Safari, 2. Fill contact form, 3. Click submit
Environment: Safari 17.2, macOS 14.2
```

### 2. 💡 Suggest Features

Have an idea? Open an issue with:

- **What**: What feature do you want?
- **Why**: How would it improve the site?
- **How**: Any implementation ideas?

### 3. 🔧 Submit Code

Want to fix a bug or add a feature?

1. **Fork** the repository
2. **Create a branch**: `git checkout -b fix/mobile-nav`
3. **Make changes** (see Development Setup below)
4. **Test** your changes
5. **Commit** with clear message
6. **Push** to your fork
7. **Open a Pull Request**

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 24+
- npm 10+
- Git

### Quick Start

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/resumee.git
cd resumee

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

### Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Docker (optional)
docker compose up        # Start with Docker
```

---

## 📝 Code Guidelines

### General Principles

- **Keep it simple**: Don't over-engineer
- **Stay consistent**: Follow existing patterns
- **Write clear code**: Code should be self-documenting
- **Comment when needed**: Complex logic needs explanation

### Code Style

- ✅ **ESLint** is configured - code is auto-checked
- ✅ **Prettier** is configured - code is auto-formatted
- ✅ Run `npm run lint` before committing
- ✅ Run `npm run format` to format code

### Vue 3 Best Practices

```vue
<!-- ✅ Good: Composition API with <script setup> -->
<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
</script>

<!-- ✅ Good: Clear prop types -->
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});
</script>

<!-- ✅ Good: Emits with types -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'close'): void;
}>();
</script>
```

### TypeScript

- ✅ Use TypeScript for all new files
- ✅ Avoid `any` - use proper types
- ✅ Use interfaces for objects
- ✅ Type all function parameters and returns

```typescript
// ✅ Good
interface User {
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

// ❌ Bad
function greetUser(user: any) {
  return `Hello, ${user.name}!`;
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <description>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Formatting, missing semicolons, etc.
refactor: Code restructuring
perf:     Performance improvement
test:     Adding tests
chore:    Maintenance

# Examples
feat(contact): add hCaptcha spam protection
fix(mobile): navigation menu closes on link click
docs(readme): add setup instructions
refactor(timeline): extract timeline item component
perf(images): lazy load images below fold
```

Always include Co-author trailer:
```
feat(contact): add email validation

Validates email format before form submission.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Desktop Chrome/Safari/Firefox
- [ ] Mobile Safari/Chrome
- [ ] Different screen sizes (mobile, tablet, desktop)
- [ ] Light/Dark mode (if applicable)
- [ ] Keyboard navigation
- [ ] Screen reader accessibility (if relevant)

### Automated Tests

Currently no automated tests. If you want to add them:

```bash
# Vitest for unit tests
npm install -D vitest @vue/test-utils

# Playwright for E2E tests
npm install -D @playwright/test
```

---

## 🌐 Internationalization (i18n)

### Adding Translations

Translations are in `src/content.de.js` and `src/content.en.js`:

```javascript
// src/content.de.js
export const content = {
  nav: {
    home: 'Startseite',
    contact: 'Kontakt'
  }
};

// src/content.en.js
export const content = {
  nav: {
    home: 'Home',
    contact: 'Contact'
  }
};
```

---

## 🚀 Pull Request Process

### Before Opening PR

1. ✅ Code follows style guidelines
2. ✅ Lint passes: `npm run lint`
3. ✅ Build succeeds: `npm run build`
4. ✅ Tested manually in browser
5. ✅ Commit messages follow convention
6. ✅ Branch is up-to-date with `master`

### PR Description Template

```markdown
## What does this PR do?
Brief description of changes.

## Why?
What problem does it solve?

## How to test?
1. Step one
2. Step two
3. Expected result

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Tested in multiple browsers
- [ ] Documentation updated (if needed)
```

### PR Review Process

1. **I'll review** within 1-3 days
2. **Feedback** may request changes
3. **Approval** → PR gets merged
4. **Thank you!** 🎉

---

## 🎨 Design Guidelines

### Colors

```css
/* Primary Colors */
--color-primary: #64ffda;      /* Cyan accent */
--color-bg: #0a192f;           /* Dark blue */
--color-text: #ccd6f6;         /* Light blue-gray */
--color-text-secondary: #8892b0; /* Muted blue */

/* Use these for consistency */
```

### Typography

- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Space Grotesk
- **Code**: JetBrains Mono

### Spacing

Use consistent spacing:
- `0.5rem` (8px)
- `1rem` (16px)
- `1.5rem` (24px)
- `2rem` (32px)

---

## 📂 Project Structure

```
src/
├── components/          # Vue components
│   ├── SiteHeader.vue  # Navigation
│   ├── ContactModal.vue # Contact form
│   └── ...
├── views/              # Page components
│   ├── HomeView.vue    # Main page
│   └── LegalView.vue   # Impressum/Datenschutz
├── content.de.js       # German content
├── content.en.js       # English content
├── router.ts           # Vue Router config
├── i18n.ts            # i18n config
└── main.ts            # App entry point

public/                 # Static assets
├── portrait.jpg       # Profile photo
├── Lebenslauf*.pdf    # German CV
└── Resume*.pdf        # English CV
```

---

## ❓ Questions?

- **Have a question?** Open an issue with "Question:" prefix
- **Not sure about something?** Ask in PR comments
- **Want to discuss ideas?** Open a discussion issue

---

## 🙏 Thank You!

Every contribution helps make this project better. Whether it's:
- Reporting a bug
- Suggesting a feature
- Fixing a typo
- Improving documentation
- Submitting code

**Your contribution is valuable!** ❤️

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

See [LICENSE](LICENSE) for details.
