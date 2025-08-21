import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';

type Props = {
  children: ReactNode;
  params: {locale: string};
};

// Can be imported from a shared config
const locales = ['en', 'hi'];

export default async function LocaleLayout({
  children,
  params: {locale},
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  let messages;
  try {
    messages = await getMessages({locale});
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}