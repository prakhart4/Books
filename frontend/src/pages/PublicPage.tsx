import { Container, Typography } from "@mui/material";

type Props = {
  currentCategory: string;
}; //{}

const getCategoryText = (currentCategory: string | undefined) => {
  if (!currentCategory) return undefined;
  switch (currentCategory) {
    case "all":
      return "All";
    case "fiction":
      return "Fiction";
    case "nonFiction":
      return "Non-fiction";
    case "science":
      return "Science";
    case "essay":
      return "Essay";
    default:
      return "All";
  }
};

export default function PublicPage({ currentCategory }: Props) {
  return (
    <Container>
      <Typography variant="h4">
        {getCategoryText(currentCategory) ?? "All"}
      </Typography>
    </Container>
  );
}
