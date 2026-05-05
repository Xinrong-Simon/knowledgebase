import clsx from 'clsx';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '湖边闲客',
    imgPath: 'img/zxr.jpg',
    description: (
      <>
        湖边闲客是个人微信的昵称，具体的信息请参考微信主页
      </>
    ),
  },
  {
    title: '随笔短文',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        这里记录了日常生活的点点滴滴，是个人生活的回忆
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, imgPath, title, description}) {
  const imgSrc = useBaseUrl(imgPath);
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {imgPath
          ? <img src={imgSrc} className={styles.featureSvg} role="img" alt={title} />
          : <Svg className={styles.featureSvg} role="img" />}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
