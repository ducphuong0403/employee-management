import React from 'react';
import { connect } from 'react-redux';
import { toggleForm, searchEmployee } from './actions';
import styles from './styles.scss';
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';
import Label from '../../atoms/Label';
import { Search } from '../../atoms/SVGIcon';

const ContentHeader = ({ toggleForm, searchEmployee }) => {
  const handleSearch = (e) => {
    if (e.target.value.length > 3) {
      searchEmployee(e.target.value);
    }
  };

  return (
    <div className={styles['root-header']}>
      <div className={styles['left-label']}>
        <Label title={'Employee '}><b style={{ fontFamily: 'sans-serif' }}> Management</b></Label>
      </div>
      <div className={styles['right']}>
        <div className={styles['search-icon']}>
          <Search style={{ marginLeft: '20px' }} />
          <TextField placeholder="Search..." onChange={handleSearch} />
        </div>
        <Button onClick={toggleForm}><i className="fas fa-plus" style={{ marginRight: '5px' }}></i> Add New</Button>
      </div>
    </div>
  );
};

export default connect(null, { toggleForm, searchEmployee })(ContentHeader);
