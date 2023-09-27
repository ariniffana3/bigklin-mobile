import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './styles';
import AutocompleteInput from 'react-native-autocomplete-input';
import axios from '../../utils/axios';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';

export default function Order(props) {
  const [openDate, setOpenDate] = useState(false);
  const [dataPel, setDataPel] = useState([]);
  const [dataTel, setDataTel] = useState([]);

  const [form, setForm] = useState({
    tanggal2: new Date(),
  });
  const [dataAroma, setDataAroma] = useState([]);
  const [autoComplete, setAutoComplete] = useState(true);
  const [autoComplete2, setAutoComplete2] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'CKS Self Service', value: 'CKS Self Service'},
    {label: 'CKL Self Service', value: 'CKL Self Service'},
    {label: 'CKS Drop Off', value: 'CKS Drop Off'},
    {label: 'CKL Drop Off', value: 'CKL Drop Off'},
  ]);
  const radioButtons = [
    {
      id: '1',
      label: 'Lunas',
      value: 'lunas',
    },
    {
      id: '2',
      label: 'Belum Lunas',
      value: 'belumLunas',
    },
  ];
  const [selectedId, setSelectedId] = useState();
  const [validate, setValidate] = useState(true);

  useEffect(() => {
    getDataOrder();
  }, []);

  const getDataOrder = async () => {
    try {
      let data = await axios.get('order');
      data = data.data.data;
      data = [...new Set(data)];
      let dataPel = data.map(i => {
        return i.nama;
      });
      let dataTel = data.map((item, index) => {
        return {index: index, nama: item.nama, telepon: item.telepon};
      });
      setDataPel(dataPel);
      setDataTel(dataTel);
      let dataAroma = data.map(i => {
        return i.aromaParfum;
      });
      dataAroma = [...new Set(dataAroma)];
      setDataAroma(dataAroma);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDate = () => {
    setOpenDate(true);
  };
  const handleChange = (value, name) => {
    setForm({...form, [name]: value});
    validateForm();
  };
  console.log(form);
  const handleTextSubmit = () => {
    setAutoComplete(true);
    setAutoComplete2(true);
  };
  const validateForm = () => {
    if (
      form.tanggal2 &&
      form.nama &&
      form.telepon &&
      form.layanan &&
      form.beratCucian &&
      form.jumlahPakaian &&
      form.aromaParfum &&
      form.hargaTotal &&
      form.status
    ) {
      setValidate(false);
    } else {
      setValidate(true);
      console.log('ya');
    }
  };

  const handleOptionSelect = async text => {
    console.log(text);
    setSelectedId(text);
    const status = radioButtons.find(i => {
      return i.id == text;
    });
    console.log(status.value);
    setForm({...form, status: status.value});
  };

  const handleSubmit = async () => {
    try {
      var tahun = form.tanggal2.getFullYear();
      var bulan = (form.tanggal2.getMonth() + 1).toString().padStart(2, '0');
      var tanggal = form.tanggal2.getDate().toString().padStart(2, '0');
      var tanggalFormat = tahun + '-' + bulan + '-' + tanggal;

      await setForm({...form, tanggal: tanggalFormat});
      console.log(form);
      let result = await axios.post('order', form);
      // console.log(result.data.data);
      props.navigation.navigate('Print', {id: result.data.data.id});
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.title}>Kasir Bigklin</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Tgl Order :</Text>
        <Button title="pilih" onPress={handleDate} />
        <DatePicker
          modal
          open={openDate}
          date={form.tanggal2}
          mode="date"
          onConfirm={datePick => {
            setOpenDate(false);
            setForm({...form, tanggal2: datePick});
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Nama Pelanggan :</Text>
        <TextInput style={styles.form_control} required />
        <View
          style={
            autoComplete
              ? styles.autocompleteContainerHide
              : styles.autocompleteContainer
          }>
          <AutocompleteInput
            style={styles.form_control}
            data={dataPel}
            value={form.nama}
            onPressIn={() => {
              console.log('first2');
              setAutoComplete(false);
            }}
            hideResults={autoComplete}
            required
            keyboardShouldPersistTaps="always"
            onSubmitEditing={handleTextSubmit}
            onChangeText={text => handleChange(text, 'nama')}
            flatListProps={{
              renderItem: ({item, index}) => (
                <TouchableOpacity
                  onPress={async () => {
                    await setAutoComplete(true);
                    const telp = dataTel.find(i => {
                      return i.index == index;
                    });
                    await setForm({
                      ...form,
                      telepon: telp.telepon,
                      nama: telp.nama,
                    });
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ),
              keyExtractor: item => item.toString(), // Atur kunci unik sesuai kebutuhan
            }}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Telepon : </Text>
        <TextInput
          style={styles.form_control}
          keyboardType="numeric"
          value={form.telepon}
          onChangeText={text => handleChange(text, 'telepon')}
          required
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.text_layanan}>Layanan :</Text>
        <DropDownPicker
          style={styles.form_control}
          open={openDropdown}
          value={value}
          items={items}
          setOpen={setOpenDropdown}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={item => {
            handleChange(item, 'layanan');
          }}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Berat Cucian :</Text>
        {/* <View style={styles.card}> */}
        <TextInput
          style={styles.form_control_beratCu}
          keyboardType="numeric"
          onChangeText={text => handleChange(text, 'beratCucian')}
          required
        />
        <Text style={styles.text_kg}> Kg</Text>
        {/* </View> */}
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Jumlah Pakaian :</Text>
        <TextInput
          style={styles.form_control}
          onChangeText={text => handleChange(text, 'jumlahPakaian')}
          keyboardType="numeric"
          required
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Aroma Parfum :</Text>
        <TextInput style={styles.form_control} />
        <View
          style={
            autoComplete
              ? styles.autocompleteContainerHide
              : styles.autocompleteContainer
          }>
          <AutocompleteInput
            style={styles.form_control}
            data={dataAroma}
            onPressIn={() => {
              setAutoComplete2(false);
            }}
            hideResults={autoComplete2}
            onSubmitEditing={handleTextSubmit}
            value={form.aromaParfum}
            required
            onChangeText={text => handleChange(text, 'aromaParfum')}
            flatListProps={{
              renderItem: ({item}) => (
                <TouchableOpacity
                  onPress={async () => {
                    setAutoComplete(true);
                    setForm({...form, aromaParfum: item});
                  }}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ),
              keyExtractor: item => item.toString(), // Atur kunci unik sesuai kebutuhan
            }}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Harga Total :</Text>
        <TextInput
          style={styles.form_control}
          onChangeText={text => handleChange(text, 'hargaTotal')}
          keyboardType="numeric"
          required
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>Status :</Text>
        <View style={styles.form_control_status}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={text => handleOptionSelect(text)}
            selectedId={selectedId}
            layout="row"
            required
          />
        </View>
      </View>
      <View>
        <Button
          title={'Simpan & Cetak'}
          color="#039BE5"
          onPress={handleSubmit}
          disabled={validate}
        />
      </View>
    </View>
  );
}
