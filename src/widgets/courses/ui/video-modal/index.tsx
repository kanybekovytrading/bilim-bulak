import { Modal } from "@heroui/react";
import { getYoutubeEmbedUrl } from "@/features/user/courses/lib/helpers";
import { CourseVideoItem } from "@/entities/user/courses/model/types";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  video?: CourseVideoItem | null;
}

export const VideoModal = ({ isOpen, onOpenChange, video }: Props) => {
  const embedUrl = video ? getYoutubeEmbedUrl(video.url) : null;

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur"
      >
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog className="rounded-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-base md:text-xl">
                {video?.title ?? ""}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="rounded-2xl overflow-hidden bg-black aspect-video">
                {embedUrl ? (
                  <iframe
                    key={embedUrl}
                    src={embedUrl}
                    height={250}
                    title={video?.title ?? "Video"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/70">
                    Видео недоступно
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
