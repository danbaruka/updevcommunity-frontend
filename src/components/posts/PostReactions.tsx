import useStore from "@/hooks/useStore";
import { patchRequest } from "@/lib/api";
import BookmarkAddSharpIcon from "@mui/icons-material/BookmarkAddSharp";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);

const PostReactions: React.FC = () => {
  const { currentPost: data, setCurrentPost } = useStore((state) => state);
  const user = useStore((state) => state.session?.user);
  const [userReaction, setUserReaction] = React.useState<ArticleReactionType | undefined>();

  const onReact = async (type: string) => {
    const post = await patchRequest({ endpoint: `/posts/${data?.id}/reactions/${type}/${user?.id}/article` });
    if (post.error) {
      toast.error(post.error);
      return;
    }
    setCurrentPost(post.data);
  };

  // on add to bookmarks
  const onAddToBookmarks = async () => {
    const post = await patchRequest({ endpoint: `/posts/${data?.id}/bookmarks/${user?.id}` });

    if (post.error) {
      toast.error(post.error);
      return;
    }
    setCurrentPost(post.data);
  };

  const Like = () => (
    <Tooltip title="I LIKE" placement="bottom" arrow>
      <IconButton onClick={() => onReact("LIKE")} disabled={!user?.id}>
        <ThumbUpSharpIcon color="info" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const Useful = () => (
    <Tooltip title="USEFUL" placement="bottom" arrow>
      <IconButton onClick={() => onReact("USEFUL")} disabled={!user?.id}>
        <LightbulbSharpIcon color="warning" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  const Love = () => (
    <Tooltip title="I LOVE" placement="bottom" arrow>
      <IconButton onClick={() => onReact("LOVE")} disabled={!user?.id}>
        <FavoriteSharpIcon color="error" fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  React.useEffect(() => {
    if (user) {
      const reaction = data?.article?.reactions?.find((reaction) => {
        return reaction?.user?.id === user?.id;
      });
      if (reaction) {
        setUserReaction(reaction.type);
      } else {
        setUserReaction(undefined);
      }
    }
  }, [data, user]);

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 52,
            transition: "all 0.5s ease",
          }}
        >
          {!userReaction ? (
            <>
              <Like />
              <Love />
              <Useful />
            </>
          ) : (
            <>
              {userReaction === "LIKE" && <Like />}
              {userReaction === "LOVE" && <Love />}
              {userReaction === "USEFUL" && <Useful />}
            </>
          )}
          <Tooltip title="See all reactions" placement="bottom" arrow>
            <IconButton>
              <Typography variant="caption" color="text.primary" fontWeight={700}>
                {data?.article?.reactions?.length}
              </Typography>
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 52 }}
          >
            <Tooltip title="Save post" placement="bottom" arrow>
              <IconButton onClick={onAddToBookmarks}>
                {data?.bookmarks?.find((el) => el.userId === user?.id) ? (
                  <BookmarkRemoveIcon color="secondary" fontSize="small" />
                ) : (
                  <BookmarkAddSharpIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PostReactions;