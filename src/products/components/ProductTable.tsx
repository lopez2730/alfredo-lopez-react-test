import { Box, Button, Table, TableBody, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from '@mui/material';
import { visuallyHidden } from "@mui/utils";
import { useProductsStore } from '../../store/products';
import TableCell from '@mui/material/TableCell';
import { Products } from '../../types';
import { useState } from 'react';
import { Link } from 'react-router-dom';



type Order = "asc" | "desc";


interface HeadCell {
  disablePadding: boolean;
  id: keyof Products;
  label: string;
}


const  headCells: readonly HeadCell[] = [
  {
    id: "title",
    disablePadding: true,
    label: "title",
  },
  {
    id: "category",
    disablePadding: false,
    label: "category",
  },
  {
    id: "description",
    disablePadding: false,
    label: "description",
  },
  {
    id: "price",
    disablePadding: false,
    label: "price",
  },
]


interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Products
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Products) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.label === "ver" ? "center" : "left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export const ProductTable = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState<keyof Products>("price");
  const products = useProductsStore(state => state.products)
  const [productSearch, setProductSearch] = useState('')

  console.log("🚀 ~ ProductTable ~ products:", products)


  const rowsPerPage = 3
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Products
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(productSearch.toLowerCase())
    );
  })
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (orderBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }
    if (orderBy === "title" || orderBy === "category" || orderBy === "description") {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const visiblePages = [];

  for (let i = Math.max(0, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
    visiblePages.push(i);
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductSearch(event.target.value);
  }

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: 10
      }}
    >
      <TextField label='buscar producto' onChange={handleSearch} />
    <TableContainer>
      <Table>
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={filteredProducts.length}
        />
        <TableBody>
          {
            paginatedProducts.map((row: any) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell><Link style={{textDecoration: 'none', color: 'inherit'}} to={`/products/${row.id}`}>Ver más</Link></TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
        <Button
          onClick={(e) => handleChangePage(e, Math.max(page - 1, 0))}
          disabled={page === 0}
        >
          Prev
        </Button>
        {visiblePages.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={(e) => handleChangePage(e, pageNumber)}
            variant={page === pageNumber ? 'contained' : 'outlined'}
            sx={{ marginX: 1 }}
          >
            {pageNumber + 1}
          </Button>
        ))}
        <Button
          onClick={(e) => handleChangePage(e, Math.min(page + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </Button>
      </Box>
    </TableContainer>
    </Box>
  )
}