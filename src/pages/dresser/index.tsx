import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useApi } from "./api";
import { ArticleEdition } from "./components/articleEdition";
import { useCallback, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const columns = [
  { name: "", uid: "photoUrl" },
  { name: "Nombre", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "Acciones", uid: "actions" },
];

export const Dresser = () => {
  // <div>dresser : AQUI UN GRID CON EL LISTADO DE PRENDAS QUE TENEMOS Y PONER UNA MODAL CON LA OPCION DE CREAR UNA NUEVA</div>

  const { articles, saveArticle } = useApi();
  const [article, setArticle] = useState<any>(null);

  const renderCell = useCallback((article: any, columnKey: any) => {
    const cellValue = article[columnKey];

    switch (columnKey) {
      case "photoUrl":
        return (
          <div className="flex flex-col">
            <img
              src={cellValue}
              alt={article.name}
              style={{
                width: "80px",
                height: "80px",
              }}
            />
          </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex flex-col">
            <MdOutlineModeEdit
              className="cursor-pointer"
              onClick={() =>
                setArticle(article)
              }
              size={24}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, [setArticle]);

  return (
    <div className="w-full">
      <div className="w-full flex items-center mb-2">
        <h1 className="w-full">Mi armario</h1>
        <Button
          onPress={() => {
            setArticle({});
          }}
          radius="none"
        >
          Crear articulo
        </Button>
      </div>
      <Table aria-label="Example table with custom cells" radius="none">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={articles.data || []}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ArticleEdition
        visible={article != null}
        article={article}
        onSave={(article: any) => {
          console.log("Guardar el articulo Article : ", article);
          saveArticle.mutate(article, {
            onSuccess: () => {
              console.log("Articulo guardado correctamente");
            },
            onError: (error) => {
              console.log("Error al guardar el articulo", error);
            },
          });
        }}
        onClose={() => {
          setArticle(null);
        }}
      />
    </div>
  );
};
