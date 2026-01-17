import type { ReactNode } from "react";
import { Modal as HeroModal, Button } from "@heroui/react";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children?: ReactNode;
}

export const Modal = ({
  isOpen,
  onOpenChange,
  title = "",
  children,
}: Props) => {
  return (
    <HeroModal>
      <HeroModal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur"
      >
        <HeroModal.Container placement="center">
          <HeroModal.Dialog>
            <HeroModal.CloseTrigger />

            <HeroModal.Header>
              <HeroModal.Heading>{title}</HeroModal.Heading>
            </HeroModal.Header>

            <HeroModal.Body>
              {children ?? (
                <p className="text-sm text-neutral-500">
                  Контент добавим позже.
                </p>
              )}
            </HeroModal.Body>

            <HeroModal.Footer>
              <Button className="w-full" slot="close">
                Ок
              </Button>
            </HeroModal.Footer>
          </HeroModal.Dialog>
        </HeroModal.Container>
      </HeroModal.Backdrop>
    </HeroModal>
  );
};
