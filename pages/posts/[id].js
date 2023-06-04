import Head from 'next/head'

import { getPostIds, getPost } from '../../lib/posts'
import Layout from '../../components/layout'
import Date from '../../components/date'

import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
    const paths = getPostIds()
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const post = await getPost(params.id)
    return {
        props: {
            post,
        },
    }
}

export default function Post({ post }) {
    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{post.title}</h1>
                <div className={utilStyles.lightText}>
                <Date dateString={post.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.postContentHtml }} />
            </article>
        </Layout>
    )
}