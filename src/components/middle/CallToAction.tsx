import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";
import { useGoogleLogin, GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { ProfileSkeleton } from "../menu/Skeleton";
import dynamic from "next/dynamic";

const Auth = dynamic(() => import("@/components/menu/Auth"), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});

const CallToAction = () => {
  const { push } = useRouter();

  const handleRegister = () => {
    push("/auth/register");
  };

  return (
    <Box
      id="call-to-action"
      sx={{
        py: 4,
        bgcolor: "primary.main",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        "&::after": {
          display: "block",
          width: 1,
          height: 1,
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.7) 40%,transparent)",
        },
      }}
    >
      <Image src="/signup.jpg" alt="Sign Up Updev Community" layout="fill" objectFit="cover" />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={2} sx={{ minHeight: 200 }} justifyContent="center">
          <Typography variant="h6" fontWeight={700} color="#fff">
            Join 66,206 other Developers as we Learn, Build, and Grow Together.
          </Typography>
          <Typography color="#d8d8d8">
            Connect with fellow developers and gain access to tools that will help you build a profitable SaaS 🚀
          </Typography>
          <Stack sx={{ width: { xs: 1, md: 250 } }}>
            <Auth />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToAction;