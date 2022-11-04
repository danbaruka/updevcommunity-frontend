import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import useStore from "@/hooks/useStore";

const Profile = () => {
  const user = useStore((state) => state.session?.user);
  const { push } = useRouter();

  const handleGoProfile = () => {
    push("/profile");
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ width: 220 }}>
      <IconButton onClick={handleGoProfile}>
        <Avatar
          sx={{ bgcolor: "primary.main", color: "white" }}
          alt={`${user?.firstName} ${user?.lastName}`}
          src="/avatar.avif"
        >
          {user?.firstName[0]}
        </Avatar>
      </IconButton>
      <Stack sx={{ width: 150, display: { xs: "none", lg: "flex" } }}>
        <Typography variant="body2" flexWrap="nowrap" color="text.primary" fontWeight={700} sx={{ width: 1 }}>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography flexWrap="nowrap" variant="caption" color="text.secondary" noWrap sx={{ width: 1 }}>
          {user?.email}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
