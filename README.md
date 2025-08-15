This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Решение проблемы безопасности macOS

1. **Откройте Finder** - нажмите кнопку "Показать в Finder" в диалоговом окне

2. **Найдите проблемный файл** - он должен быть в папке вашего проекта Next.js

3. **Удалите проблемный файл** - это временный файл, который Next.js может пересоздать

4. **Очистите кэш npm**:
   ```bash
   npm cache clean --force
   ```

5. **Переустановите зависимости**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

6. **Попробуйте запустить проект снова**:
   ```bash
   npm run dev
   ```

## Альтернативное решение

Если проблема повторяется, можно попробовать использовать другой пакетный менеджер:

```bash
# Установить yarn
npm install -g yarn

# Или использовать pnpm
npm install -g pnpm

# Затем запустить проект
yarn dev
# или
pnpm dev
```

Проблема возникает из-за того, что macOS блокирует выполнение бинарных файлов, загруженных из интернета. После очистки кэша и переустановки зависимостей проект должен работать нормально.
