import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from '../../utils/axios';

export default function Recap() {
  // const formData = new FormData();
  const [form, setForm] = useState({});
  const [data, setData] = useState({});
  const [perWeek, setPerWeek] = useState(true);

  useEffect(() => {
    getResult();
  }, [form]);

  const getResult = async () => {
    try {
      console.log(form);
      const result = await axios.post('orderfilter', form);
      console.log('result', result.data.data.length);
      let totalPemasukan = 0;
      result.data.data.map(item => {
        totalPemasukan += item.hargaTotal * 1;
      });

      let totalPesanan = result.data.data.length;

      let beratCucian = 0;
      result.data.data.map(item => {
        beratCucian += item.beratCucian * 1;
      });

      let jumlahPakaian = 0;
      result.data.data.map(item => {
        jumlahPakaian += item.jumlahPakaian * 1;
      });

      await setData({
        totalPemasukan: totalPemasukan,
        totalPesanan: totalPesanan,
        beratCucian: beratCucian,
        jumlahPakaian: jumlahPakaian,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPerWeek = async () => {
    try {
      var today = new Date();
      var dayOfWeek = today.getDay();
      var daysUntilMonday = dayOfWeek === 1 ? 0 : 1 - dayOfWeek;
      var daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
      var nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilMonday);
      var nextSunday = new Date(today);
      nextSunday.setDate(today.getDate() + daysUntilSunday);
      var formattedMonday = nextMonday.toISOString().split('T')[0];
      var formattedSunday = nextSunday.toISOString().split('T')[0];
      // console.log(formattedMonday);
      setForm({
        // ...date,
        startDate: formattedMonday,
        endDate: formattedSunday,
      });
      // formData.append('startDate', formattedMonday);
      // formData.append('endDate', formattedSunday);
      // await getResult(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPerMonth = async () => {
    setPerWeek(false);
    var today = new Date();
    var month = today.getMonth();
    var year = today.getFullYear();
    var firstDayOfMonth = new Date(year, month, 1);
    var nextMonth = (month + 1) % 12;
    var nextYear = year + (month === 11 ? 1 : 0);
    var lastDayOfMonth = new Date(nextYear, nextMonth, 0);
    var formattedFirstDay = firstDayOfMonth.toISOString().split('T')[0];
    var formattedLastDay = lastDayOfMonth.toISOString().split('T')[0];
    setForm({
      // ...date,
      startDate: formattedFirstDay,
      endDate: formattedLastDay,
    });
  };
  return (
    <View>
      <View>
        <Text>{perWeek ? 'Rekap Mingguan : ' : 'Rekap Bulanan : '}</Text>
        <Button title="Rekap Mingguan" onPress={getDataPerWeek} />
        <Button title="Rekap Bulanan" onPress={getDataPerMonth} />
      </View>
      <View>
        <Text>Total Pemasukan : </Text>
        <Text>{data.totalPemasukan}</Text>
      </View>
      <View>
        <Text>Total Pesanan : </Text>
        <Text>{data.totalPesanan}</Text>
      </View>
      <View>
        <Text>Berat Cucian : </Text>
        <Text>{data.beratCucian}</Text>
      </View>
      <View>
        <Text>Jumlah Pakaian :</Text>
        <Text>{data.jumlahPakaian}</Text>
      </View>
      <Button title="print" />
    </View>
  );
}
