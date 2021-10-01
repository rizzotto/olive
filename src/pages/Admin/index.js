/* eslint-disable no-console */
import React, { useContext, useEffect } from 'react';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
} from '@material-ui/core';
import { AppContext } from '../../context/AppProvider';
import { firestore } from '../../services/firebase';
import { useHistory } from 'react-router';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import Input from '../../components/Input';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

function Admin() {
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const { authUser } = useContext(AppContext);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    let newUsers = [];
    firestore
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          newUsers.push({ id: doc.id, ...doc.data() });
        });
        setUsers(newUsers);
        setFilteredUsers(newUsers);
        setLoading(false);
      });
  }, []);

  const handleChange = (event, user) => {
    try {
      firestore
        .collection('users')
        .doc(user.id)
        .update({ role: event.target.value });

      const newUsers = array =>
        array.map(u => {
          if (u.id === user.id) return { ...u, role: event.target.value };
          return u;
        });

      setUsers(newUsers(users));
      setFilteredUsers(newUsers(filteredUsers));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = e => {
    if (!e.target.value) {
      setFilteredUsers(users);
    } else {
      const newUsers = users.filter(u => {
        return u.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setFilteredUsers(newUsers);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <IconButton
          style={{ padding: 0 }}
          onClick={() => history.push('/settings')}
        >
          <ArrowBackIosOutlinedIcon color="secondary" />
        </IconButton>
      </div>
      <div className={classes.sticky}>
        <h1 style={{ marginBottom: 0 }}>Curadores</h1>
        <Input
          hiddenLabel
          placeholder="Buscar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ fill: '#C4C4C6' }} />
              </InputAdornment>
            ),
          }}
          onChange={e => handleSearch(e)}
        />
      </div>
      <div>
        {!loading ? (
          filteredUsers.map((user, i) => (
            <div key={user.email} className={classes.userContainer}>
              <div className={classes.user}>
                <h3 className={classes.h3}>
                  {authUser.uid === user.id ? `${user.name} (Eu)` : user.name}
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="outlined"
                  disabled={authUser.uid === user.id}
                  style={{
                    borderRadius: 12,
                    backgroundColor: '#F3F3F3',
                    width: '100%',
                    height: 56,
                    maxWidth: 182,
                  }}
                  value={user.role}
                  onChange={e => handleChange(e, user, i)}
                >
                  <MenuItem value={0}>Administrador</MenuItem>
                  <MenuItem value={2}>Curador</MenuItem>
                  <MenuItem value={1}>Usuário</MenuItem>
                </Select>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
