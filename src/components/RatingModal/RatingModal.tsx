import { Button, Divider, Flex, Modal, Rating, Text } from "@mantine/core";
import { Movie } from "../../utils/types";

export default function RatingModal({
  film,
  rating,
  setRating,
  opened,
  onClose,
  handleSaveRating,
  handleRemoveRating,
}: {
  film: Movie;
  rating: number;
  setRating: (rating: number) => void;
  opened: boolean;
  onClose: () => void;
  handleSaveRating: () => void;
  handleRemoveRating: () => void;
}) {
  return (
    <Modal.Root opened={opened} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content w="100%" maw={{ xs: "380px", base: "320px" }} radius={8}>
        <Modal.Header>
          <Modal.Title fw={700}>Your rating</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Divider />
        <Modal.Body p={16}>
          <Flex direction="column" rowGap={16}>
            <Text fw={700}>{film.original_title}</Text>
            <Rating
              value={rating}
              onChange={setRating}
              defaultValue={rating}
              w="100%"
              styles={{
                root: { display: "flex", justifyContent: "space-between" },
              }}
              count={10}
              size={28}
            />
            <Flex gap={16}>
              <Button
                w="fit-content"
                radius={8}
                bg={"#9854F6"}
                onClick={handleSaveRating}
              >
                Save
              </Button>
              <Button
                variant="white"
                color="violet"
                w="fit-content"
                onClick={handleRemoveRating}
              >
                Remove rating
              </Button>
            </Flex>
          </Flex>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
