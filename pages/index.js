import Head from 'next/head';
import Link from 'next/link';

import { getSortedPosts } from '../lib/posts'
import Layout, { siteTitle } from '../components/layout';
import Date from '../components/date';

import utilStyles from '../styles/utils.module.css';

export async function getStaticProps() {
    const posts = getSortedPosts()
    return {
        props: {
            posts
        }
    }
}

export default function Home({ posts }) {
  return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={utilStyles.headingMd}>
                <p>Hi! I'm Farzan! A Frontend engineer that love working with various tools and building softwares. You can connect me on <a href='https://twitter.com/@fff4r34n' alt="fffarzan twitter's link">Twitter</a></p>
                <p>(It's my official blog that I'll write it in English and Persian)</p>
            </section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {posts.map(({ postId, date, title }) => (
                        <li className={utilStyles.listItem} key={postId}>
                            <Link href={`/posts/${postId}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
  )
}