import Empty from "@/components/common/Empty";
import useStore from "@/hooks/useStore";
import { getRequest } from "@/lib/api";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import React from "react";
import ListItems from "./ListItems";

const RightSideBar = () => {
  const { push, locale } = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return null;
  }

  const handleView = (path: string, type: "posts" | "articles") => {
    push(`/${type}/${path}`);
  };

  const setTopPosts = useStore((state) => state.setTopPostsOfTheWeek);
  const posts = useStore((state) => state.topPostsOfTheWeek);

  React.useEffect(() => {
    const getPosts = async () => {
      const posts = await getRequest({ endpoint: "/posts/top/posts-sidebar" });
      if (!posts.error) {
        setTopPosts(posts.data);
      }
    };

    getPosts();
  }, []);

  return (
    <Stack spacing={2} sx={{ width: 1, pb: 5 }}>
      <Paper variant="outlined" sx={{ position: "relative", width: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
          {locale === "en" ? "Top articles of the Week" : "Meilleurs articles de la semaine"}
        </Typography>
        <Divider />
        <List sx={{ width: { xs: "100%" }, bgcolor: "background.paper" }}>
          {posts?.topArticlesOfTheWeek?.length === 0 && <Empty />}
          {posts?.topArticlesOfTheWeek?.map((item, i) => (
            <ListItems
              key={item.id}
              item={item}
              handleViewPost={(path) => handleView(path, "articles")}
              divider={i !== posts?.topArticlesOfTheWeek.length - 1}
            />
          ))}
        </List>
        <Divider />
        <Typography variant="h6" sx={{ fontWeight: "bold", p: 2 }}>
          {locale === "en" ? "Top Posts of the Week" : "Meilleurs posts de la semaine"}
        </Typography>
        <Divider />
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {posts?.topQuestionsOfTheWeek?.length === 0 && <Empty />}
          {posts?.topQuestionsOfTheWeek?.map((item, i) => (
            <ListItems
              key={item.id}
              item={item}
              handleViewPost={(path) => handleView(path, "posts")}
              divider={i !== posts?.topQuestionsOfTheWeek.length - 1}
            />
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default React.memo(RightSideBar);
