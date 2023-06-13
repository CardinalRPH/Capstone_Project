import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { EditorURI, WeatherandPlant } from "../../../../globals/config";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"
import ADXplant_modalEdit from "../../compoents/Editor/plant/ADXPlantModalEdit";
import ADXplant_modalNew from "../../compoents/Editor/plant/ADXPlantModalNew";

const ADXPlants_pg = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([]);
  const [data_plants, setdata_plants] = useState([]);


  const GetAllPlants = () => {
    fetch(WeatherandPlant().getAllPlant(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != false)) {
          setPlants(resolve.data);
        }
      }).catch((error) => {
        console.log(error);
      });
  }


  const columns = [
    {
      name: 'ID',
      selector: (row) => row.plantId
    },
    {
      name: 'Name',
      selector: (row) => row.name
    },
    {
      name: 'inWeatherFrom',
      selector: (row) => row.inWeatherFrom
    },
    {
      name: 'inWeatherto',
      selector: (row) => row.inWeatherto
    },
    {
      name: 'Watering',
      selector: (row) => row.onWatering
    },
    {
      name: 'Fertilizer',
      selector: (row) => row.onFertilizer
    },
    {
      name: 'Harvest',
      selector: (row) => row.onHarvest
    },
  ];

  const onDelete = () => {
    if (window.confirm(`Yakin Menghapus Field ${data_plants.name}`) == true) {
      fetch(EditorURI(data_plants.plantId).DeletePlant(), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
        },
      }).then(() => {
        console.log('Success Delete');
      }).catch((error) => {
        console.log(error);
      });
    } else {
      
    }
  }

  const modalShowEdit = () => {
    const myModal = new Modal(document.getElementById('plantModalEdit'));
    myModal.show();
  }
  const modalShowNew = () => {
    const myModal = new Modal(document.getElementById('plantModalNew'));
    myModal.show();
  }

  const ExpandedComponent = ({ data }) => {

    useEffect(() => {
      setdata_plants(data);
    }, []);

    return (
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mx-2" onClick={modalShowEdit}>Update</button>
        <button className="btn btn-danger mx-2" onClick={onDelete}>Delete?</button>
      </div>

    );
  };


  useEffect(() => {
    GetAllPlants();
    if (isAuthenticated) {

    }
  }, []);

  return (
    <>
      <button className="btn btn-primary" onClick={modalShowNew}>Add Item</button>
      <DataTable
        columns={columns}
        data={plants}
        pagination={true}
        paginationPerPage={10}
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={ExpandedComponent}
      />
      <ADXplant_modalEdit dataPlant={data_plants} />
      <ADXplant_modalNew />
    </>
  );
};

export default ADXPlants_pg;
