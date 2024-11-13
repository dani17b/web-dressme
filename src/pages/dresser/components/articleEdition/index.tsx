import { CATEGORIES } from "@/const/Categories";
import { SEASONS } from "@/const/SEASONS";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ArticleEditionProps {
  visible: boolean;
  onSave: (article: any) => void;
  onClose: () => void;
  article : any;
}

// TODO todo esto de base de datos

const COLORS = [
  {
    value: "1",
    label: "Blanco",
  },
  {
    value: "2",
    label: "Negro",
  },
];

const CLIMATOLOGIES = [
  {
    value: "1",
    label: "Dia lluvioso",
  },
  {
    value: "2",
    label: "Dia calido",
  },
];

export const ArticleEdition = (props: ArticleEditionProps) => {
  const { visible, onSave } = props;

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure({
    defaultOpen: visible,
  });

  const [article, setArticle] = useState<any>(props.article || {
    name: "",
    category: null,
    color: null,
    season: null,
    climatologies: [],
    photoUrl: "",
  });

  useEffect(() => {
    if (visible) {
      onOpenChange();
    }
  }, [visible]);

  useEffect(() => {
    setArticle(props.article || {
      name: "",
      category: null,
      color: null,
      season: null,
      climatologies: [],
      photoUrl: "",
    })
  }, [props.article]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(modalIsOpen) => {
        onOpenChange();

        if (!modalIsOpen) {
          props.onClose();
        }
      }}
      radius="none"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {article.key ? "Editar prenda" : "Crear prenda"}
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="Nombre"
                radius="none"
                value={article.name}
                onChange={(e) => {
                  setArticle({
                    ...article,
                    name: e.target.value,
                  });
                }}
              />
              <Select
                items={CATEGORIES}
                label="Tipo de prenda"
                placeholder="Selecciona un tipo de prenda"
                className="w-full"
                radius="none"
                selectedKeys={article.category ? [article.category] : []}
                onChange={(e) => {
                  setArticle({
                    ...article,
                    category: e.target.value,
                  });
                }}
              >
                {(category) => (
                  <SelectItem key={category.value}>{category.label}</SelectItem>
                )}
              </Select>
              <Select
                items={COLORS}
                label="Color de la prenda"
                placeholder="Selecciona un color de prenda"
                className="w-full"
                radius="none"
                selectedKeys={article.color ? [article.color] : []}
                onChange={(e) => {
                  setArticle({
                    ...article,
                    color: e.target.value,
                  });
                }}
              >
                {(color) => (
                  <SelectItem key={color.value}>{color.label}</SelectItem>
                )}
              </Select>
              <Select
                items={SEASONS}
                label="Temporada"
                placeholder="Selecciona una temporada"
                className="w-full"
                radius="none"
                selectedKeys={article.season ? [article.season] : []}
                onChange={(e) => {
                  setArticle({
                    ...article,
                    season: e.target.value,
                  });
                }}
              >
                {(season) => (
                  <SelectItem key={season.value}>{season.label}</SelectItem>
                )}
              </Select>
              <Select
                items={CLIMATOLOGIES}
                label="Climatologia"
                placeholder="Selecciona una climatologia"
                className="w-full"
                radius="none"
                selectionMode={"multiple"}
                selectedKeys={article.climatologies}
                onChange={(e) => {
                  setArticle({
                    ...article,
                    climatologies: e.target.value
                      .trim()
                      .split(",")
                      .filter((item: any) => item !== ""),
                  });
                }}
              >
                {(climatology) => (
                  <SelectItem key={climatology.value}>
                    {climatology.label}
                  </SelectItem>
                )}
              </Select>
              <Input
                type="text"
                label="Foto"
                radius="none"
                value={article.photoUrl}
                onChange={(e) => {
                  setArticle({
                    ...article,
                    photoUrl: e.target.value,
                  });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                radius="none"
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onSave(article);
                  onClose();
                }}
                radius="none"
              >
                {article.key ? "Actualizar prenda" : "Crear prenda"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
