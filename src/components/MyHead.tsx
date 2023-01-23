import Head from 'next/head';

export const MyHead = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string;
}) => {
  return (
    <Head>
      <title>{`${title} || thedimas Music`}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel='icon' href='/favicon.png' />
    </Head>
  );
};
