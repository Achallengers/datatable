import ResponsiveNavBar from './layout/NavBar';
import DataTableFilter from './components/Tables/DataTableFilter';
// import DataTable from './components/Tables/DataTable';
// import SearchTable from './components/Tables/SearchTable';
import { Box, Container } from '@mui/material';

function App() {
  return (
    <Box component="div">
      <ResponsiveNavBar />
      <Container sx={{my: 2}} >
        <DataTableFilter />
      </Container>
    </Box>
  );
}

export default App;