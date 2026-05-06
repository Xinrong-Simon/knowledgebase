import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Photos() {
  return (
    <Layout title="瞬间留影" description="学习、生活和工作中的精彩瞬间">
      <main style={{maxWidth: 960, margin: '2rem auto', padding: '0 1rem'}}>
        <Heading as="h1">学习、生活和工作瞬间留影</Heading>
        <p>这里将陆续收录学习、生活与工作中的精彩瞬间。</p>
      </main>
    </Layout>
  );
}
