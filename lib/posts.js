import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPosts() {
    const postNames = fs.readdirSync(postsDirectory)
    const posts = postNames.map(postName => {
        const postId = postName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, postName)
        const postContent = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(postContent)
        return { postId, ...matterResult.data }
    })
    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}

export function getPostIds() {
    const postNames = fs.readdirSync(postsDirectory)
    return postNames.map(postName => ({ params: { id: postName.replace(/\.md$/, '') } }))
}

export async function getPost(postId) {
    const fullPath = path.join(postsDirectory, `${postId}.md`)
    const post = fs.readFileSync(fullPath, 'utf8')
    const postMatter = matter(post)
    const postContent = await remark().use(html).process(postMatter.content)
    const postContentHtml = postContent.toString()
    return { postId, postContentHtml, ...postMatter.data }
}