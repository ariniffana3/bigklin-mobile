import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  body: {
    padding: 20,
    height: 2000,
    backgroundColor: '#E8F0FE',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  form_control: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: '#FCFDFE',
    height: 40,
    display: 'flex',
    width: 200,
  },
  form_control_beratCu: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: '#FCFDFE',
    height: 40,
    display: 'flex',
    width: 150,
  },
  form_control_status: {
    paddingLeft: 0,
  },
  text: {
    display: 'flex',
  },
  text_layanan: {
    display: 'flex',
    marginRight: 60,
  },
  autocompleteContainer: {
    flex: 1,
    left: 120,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10000,
  },
  autocompleteContainerHide: {
    flex: 1,
    left: 120,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card_pel: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center'
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card_beratCu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 85,
  },
  flatList: {
    display: 'flex',
    // alignItems: 'flex-start',
    position: 'absolute',
    left: 30,
  },
});
