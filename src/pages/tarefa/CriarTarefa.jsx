import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  MenuItem,
  Select,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

// Componente CriarTarefa
const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');

  useEffect(() => {
    const proximoId = Math.max(...tarefas.map((tarefa) => tarefa.idTarefa), 0) + 1;
    setIdTarefa(proximoId);
  }, [tarefas]);

  const handleSalvar = () => {
    console.log(
      `id: ${idTarefa} \n titulo: ${tituloTarefa} \n descrição: ${descricaoTarefa} \n inicio: ${inicioTarefa} \n fim: ${fimTarefa} \n recurso: ${recursoTarefa} \n status: ${statusTarefa}`
    );

    setTarefas([
      ...tarefas,
      {
        idTarefa,
        tituloTarefa,
        descricaoTarefa,
        inicioTarefa,
        fimTarefa,
        recursoTarefa,
        statusTarefa,
      },
    ]);

    handleClose();
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card sx={style.card}>
        <CardHeader
          title="Cadastro de Tarefas"
          subheader="Preencha os campos para criar uma nova tarefa"
          sx={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_titulo">Título</InputLabel>
                <Input
                  id="tarefa_titulo"
                  value={tituloTarefa}
                  onChange={(e) => setTituloTarefa(e.target.value)}
                />
                <FormHelperText>Digite o título da tarefa.</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_descricao">Descrição</InputLabel>
                <Input
                  id="tarefa_descricao"
                  value={descricaoTarefa}
                  onChange={(e) => setDescricaoTarefa(e.target.value)}
                />
                <FormHelperText>Descreva a tarefa.</FormHelperText>
              </FormControl>
            </Grid>

            {/* Datas */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel shrink>Início</InputLabel>
                <Input
                  type="date"
                  value={inicioTarefa}
                  onChange={(e) => setInicioTarefa(e.target.value)}
                />
                <FormHelperText>Data de início</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel shrink>Fim</InputLabel>
                <Input
                  type="date"
                  value={fimTarefa}
                  onChange={(e) => setFimTarefa(e.target.value)}
                />
                <FormHelperText>Data de término</FormHelperText>
              </FormControl>
            </Grid>

            {/* Selects */}
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Recurso</InputLabel>
                <Select
                  value={recursoTarefa}
                  onChange={(e) => setRecursoTarefa(e.target.value)}
                >
                  <MenuItem value={'Recurso 1'}>Recurso 1</MenuItem>
                  <MenuItem value={'Recurso 2'}>Recurso 2</MenuItem>
                  <MenuItem value={'Recurso 3'}>Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusTarefa}
                  onChange={(e) => setStatusTarefa(e.target.value)}
                >
                  <MenuItem value={'Aguardando'}>Aguardando</MenuItem>
                  <MenuItem value={'Em Andamento'}>Em Andamento</MenuItem>
                  <MenuItem value={'Concluída'}>Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>

        {/* Ações */}
        <Box sx={style.actions}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSalvar}
          >
            Salvar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleClose}
          >
            Cancelar
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

const style = {
  card: {
    width: '90%',
    maxWidth: '800px',
    marginTop: '50px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    borderRadius: '12px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
};

export default CriarTarefa;
