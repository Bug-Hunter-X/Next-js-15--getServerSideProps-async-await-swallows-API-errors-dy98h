import {unstable_getServerSession} from 'next-auth';
import {authOptions} from './auth/[...nextauth]';

export default function Home({posts}){
  return (
    <div>{posts.map(post=>(
        <div key={post.id}>{post.title}</div>
      ))}</div>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context, authOptions);
  try {
    const res = await fetch(`http://localhost:3000/api/posts`);
    const posts = await res.json();

    if (!res.ok) {
      console.error('API request failed:', res.status, res.statusText);
      return {
        props: {
          posts: []
        },
        redirect: {
          destination: '/error',
          permanent: false
        }
      };
    }

    return {
      props: {
        posts: posts
      }
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      props: {
        posts: []
      },
      redirect: {
        destination: '/error',
        permanent: false
      }
    };
  }
}