import { Link as RouterLink } from "@solidjs/router";
import CheckBoxIcon from "@suid/icons-material/CheckBox";
import { useTheme } from "@suid/material";
import {
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@suid/material";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";
import { tryPreload } from "~/Routing";
import TypingEffect from "~/components/TypingEffect";
import InstallButton from "~/pages/HomePage/InstallButton";

let typeEffect1 = true;
let typeEffect2 = true;

function ListItemFeature(props: { text: string; checkbox?: boolean }) {
  return (
    <ListItem disablePadding>
      <Show when={props.checkbox}>
        <ListItemIcon sx={{ minWidth: 35 }}>
          <CheckBoxIcon />
        </ListItemIcon>
      </Show>
      <ListItemText>{props.text} </ListItemText>
    </ListItem>
  );
}

function ListItemComponents(props: { start?: boolean }) {
  const [amount, setAmount] = createSignal(10);
  let interval: number | undefined;
  let started = false;
  createEffect(() => {
    if (!props.start || started) return;
    started = true;
    interval = window.setInterval(() => {
      setAmount(amount() + 1);
      if (amount() === 50) {
        return clearInterval(interval);
      }
    }, 80);
  });
  onCleanup(() => clearInterval(interval));
  return <ListItemFeature text={`+${amount()} Components`} />;
}

function MainText(props: { onFinished?: () => void }) {
  const theme = useTheme();
  const [finished, setFinished] = createSignal(!typeEffect1);
  typeEffect1 = false;
  return (
    <Box
      component="span"
      sx={{
        ...(finished() && {
          cursor: "pointer",
          "&:hover": {
            color: "primary.main",
            transition: theme.transitions.create("color", {
              duration: 1000,
            }),
          },
        }),
      }}
      onClick={() => {
        if (finished()) {
          setFinished(false);
        }
      }}
    >
      <Show when={!finished()} fallback={<span>for you.</span>}>
        <TypingEffect
          onStart={() => setFinished(false)}
          onFinish={() => {
            setFinished(true);
            props.onFinished?.();
          }}
          effects={[
            {
              type: "delay",
              ms: 1200,
            },
            {
              type: "write",
              text: "for your app",
            },
            {
              type: "delay",
              ms: 1000,
            },
            {
              type: "erase",
              length: "app".length,
            },
            {
              type: "write",
              text: "site",
            },
            {
              type: "delay",
              ms: 2000,
            },
            {
              type: "erase",
              length: "your site".length,
            },
            {
              type: "write",
              text: "you.",
            },
          ]}
        />
      </Show>
    </Box>
  );
}

function HeroText() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const is720 = useMediaQuery(theme.breakpoints.down(720));
  return (
    <Paper
      square
      sx={{
        bgcolor: "secondary.main",
        color: "white",
        my: md() ? 3 : 20,
        backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: "2.3rem",
              [theme.breakpoints.down("md")]: {
                fontSize: "2rem",
              },
              [theme.breakpoints.down(500)]: {
                fontSize: "1.8rem",
              },
              [theme.breakpoints.down(450)]: {
                fontSize: "1.5rem",
              },
              [theme.breakpoints.down(400)]: {
                fontSize: "1.4rem",
              },
              [theme.breakpoints.down(350)]: {
                fontSize: "1.3rem",
              },
              [theme.breakpoints.down(300)]: {
                fontSize: "1.20rem",
              },
            }}
          >
            Same API. Same Design.{" "}
            <Show when={is720()}>
              <br />
            </Show>
            Different technology.
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, fontSize: is720() ? 16 : 18 }}
          >
            Power your MUI app by replacing React with SolidJS.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}

export default function HomePage() {
  const theme = useTheme();
  const [finished, setFinished] = createSignal(!typeEffect2);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  typeEffect2 = false;
  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={0} sx={{ mt: "25%" }}>
          <Grid
            item
            sm={12}
            md={8}
            sx={{
              ...(isDownMd() && {
                flexBasis: "100%",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
              }),
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: 600,
                [theme.breakpoints.down("md")]: {
                  fontSize: "3rem",
                },
                [theme.breakpoints.down(500)]: {
                  fontSize: "2.50rem",
                },
                [theme.breakpoints.down(450)]: {
                  fontSize: "2.30rem",
                },
                [theme.breakpoints.down(400)]: {
                  fontSize: "1.95rem",
                },
                [theme.breakpoints.down(350)]: {
                  fontSize: "1.60rem",
                },
                [theme.breakpoints.down(300)]: {
                  fontSize: "1.50rem",
                },
              }}
            >
              The ideal{" "}
              <Box
                component="span"
                sx={{
                  backgroundImage: `linear-gradient(${[
                    "to right bottom",
                    theme.palette.primary.main,
                    theme.palette.secondary.main,
                  ].join(", ")})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                SolidJS
              </Box>{" "}
              UI <br />
              library <MainText onFinished={() => setFinished(true)} />
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.secondary, my: 3 }}
            >
              A port of Material-UI (
              <Link href="https://mui.com/core" target="_blank">
                MUI
              </Link>
              ) built with{" "}
              <Link href="https://solidjs.com" target="_blank">
                SolidJS
              </Link>
              .
            </Typography>{" "}
            <Stack
              direction={isDownMd() ? "column" : "row"}
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <Button
                component={RouterLink}
                variant="contained"
                size="large"
                href="/getting-started/installation"
                onMouseEnter={tryPreload}
                fullWidth={isXs()}
              >
                Get started
              </Button>
              <Show when={!isDownMd()}>
                <Typography>or</Typography>
              </Show>
              <InstallButton fullWidth={isXs()} />
            </Stack>
          </Grid>
          <Show when={isDownMd()}>
            <Grid xs={12}>
              <Divider sx={{ mt: 5 }} />
            </Grid>
          </Show>
          <Grid
            item
            sm={12}
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "center",
              ...(isDownMd() && {
                flexBasis: "100%",
                mt: 5,
              }),
            }}
          >
            <Show when={!isDownMd()}>
              <Divider orientation={"vertical"} />
            </Show>

            <List
              disablePadding
              dense
              sx={{
                pl: 3,
                [`& ${Typography}`]: {
                  fontSize: 21,
                  fontWeight: 200,
                },
              }}
            >
              <ListItemFeature text="TypeScript" checkbox />
              <ListItemFeature text="Material Design" checkbox />
              <ListItemFeature text="Styled Components" checkbox />
              <ListItemFeature text="Controlled Components" checkbox />
              <Fade in={finished()} timeout={1000}>
                <ListItemComponents start={finished()} />
              </Fade>
            </List>
          </Grid>
        </Grid>
      </Container>
      <HeroText />
    </>
  );
}
