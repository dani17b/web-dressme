import {
  Button,
  Chip,
  Spinner,
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
import { CATEGORIES } from "@/const/CATEGORIES";
import { SEASONS } from "@/const/SEASONS";
import { COLORS } from "@/const/COLORS";
import { CLIMATOLOGIES } from "@/const/CLIMATOLOGIES";

const columns = [
  { name: "", uid: "photoUrl" },
  { name: "Nombre", uid: "name" },
  { name: "Categoría", uid: "category" },
  { name: "Temporada", uid: "season" },
  { name : "Color", uid : "color"},
  { name : "Climatologias", uid : "climatologies"},
  { name: "Acciones", uid: "actions" },
];

export const Dresser = () => {

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
              className="object-cover"
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
      case "category":
        return (
          <div className="flex flex-col">
            <Chip className="capitalize" radius="none">
              {CATEGORIES.find((category) => category.value === cellValue)?.label}
            </Chip>
          </div>
        );
      case "season":
        return (
          <div className="flex flex-col">
            <Chip className="capitalize" radius="none">
              {SEASONS.find((season) => season.value === cellValue)?.label}
            </Chip>
          </div>
        );
      case "color":
        return (
          <div className="flex flex-col">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS.find((color) => color.value === cellValue)?.color, border: "1px solid #000" }}
            ></div>
          </div>
        );
      case "climatologies":
        return (
          <div className="flex flex-row space-x-2">
            {cellValue.map((cellValueItem: any) => {
              const Climatology:any = CLIMATOLOGIES.find((climatology) => climatology.value === cellValueItem)?.icon;


              return Climatology;
            }
              
            )}
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
        <TableBody items={articles.data || []} isLoading={articles.isLoading}
        loadingContent={<Spinner />}>
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
          saveArticle.mutate(article, {
          });
        }}
        onClose={() => {
          setArticle(null);
        }}
      />
    </div>
  );
};
