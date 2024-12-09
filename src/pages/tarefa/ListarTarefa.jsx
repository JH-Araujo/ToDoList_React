import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Card, CardHeader,
  CardContent, CardActions, Button, Modal, Box,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Criação do tema customizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Azul vibrante
    },
    secondary: {
      main: '#f50057', // Rosa
    },
    success: {
      main: '#4caf50', // Verde sucesso
    },
    error: {
      main: '#d32f2f', // Vermelho erro
    },
  },
});

// Dados iniciais
function createData(idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2024-01-01', '2024-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2024-01-03', '2024-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2024-01-04', '2024-01-05', 'Aguardando', 'Recurso 3'),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  useEffect(() => {
    setTarefas(initialRows);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = (tarefa) => {
    setTarefaSelecionada(tarefa);
    setOpenEditar(true);
  };
  const handleCloseEditar = () => setOpenEditar(false);

  const handleDeletar = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.idTarefa !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Card sx={{ boxShadow: 3 }}>
          <CardHeader
            title="Gestão de Tarefas"
            subheader="Visualize e gerencie suas tarefas"
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
          <CardContent>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table aria-label="Tabela de Tarefas">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                    <TableCell>#</TableCell>
                    <TableCell>Título</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Início</TableCell>
                    <TableCell>Fim</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Recurso</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tarefas.map((row, index) => (
                    <TableRow key={index} sx={{ '&:nth-of-type(even)': { bgcolor: '#f5f5f5' } }}>
                      <TableCell>{row.idTarefa}</TableCell>
                      <TableCell>{row.tituloTarefa}</TableCell>
                      <TableCell>{row.descricaoTarefa}</TableCell>
                      <TableCell>{row.inicioTarefa}</TableCell>
                      <TableCell>{row.fimTarefa}</TableCell>
                      <TableCell>{row.statusTarefa}</TableCell>
                      <TableCell>{row.recursoTarefa}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="success"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenEditar(row)}
                          sx={{ mr: 1 }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeletar(row.idTarefa)}
                        >
                          Deletar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Criar Tarefa
            </Button>
          </CardActions>
        </Card>

        {/* Modal Criar Tarefa */}
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
          </Box>
        </Modal>

        {/* Modal Editar Tarefa */}
        <Modal open={openEditar} onClose={handleCloseEditar}>
          <Box sx={modalStyle}>
            <EditarTarefa
              handleCloseEditar={handleCloseEditar}
              tarefa={tarefaSelecionada}
              tarefas={tarefas}
              setTarefas={setTarefas}
            />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

// Estilo do Modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default ListarTarefa;
