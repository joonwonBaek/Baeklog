import { gql, useQuery } from "@apollo/client";
import {
  Card,
  Center,
  Container,
  Divider,
  EquallyGrid,
  Heading,
  Spinner,
  Text,
} from "@co-design/core";
const GET_POSTS = gql`
  query GetPost {
    posts {
      data {
        id
        attributes {
          title
          body
          createdAt
          user {
            data {
              attributes {
                username
              }
            }
          }
        }
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  return (
    <Container padding={16}>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <EquallyGrid cols={4}>
          {data.posts.data.map((post: any) => (
            <Card key={post.id}>
              <Heading level={4}>{post.attributes.title}</Heading>
              <Text lineClamp={3}>{post.attributes.body}</Text>
              <Divider />
              <Text block align="right">
                {post.attributes.user.data.attributes.username}
              </Text>
            </Card>
          ))}
        </EquallyGrid>
      )}
    </Container>
  );
}
