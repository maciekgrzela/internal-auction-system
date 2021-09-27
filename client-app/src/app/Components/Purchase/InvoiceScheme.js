import React from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
} from '@react-pdf/renderer';
import font1 from '../../Fonts/OpenSans-Regular.ttf';
import font2 from '../../Fonts/OpenSans-Bold.ttf';

Font.register({ family: 'OpenSans-Regular', src: font1 });
Font.register({ family: 'OpenSans-Bold', src: font2 });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  title: {
    margin: 20,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'OpenSans-Bold',
  },
  sellerInfo: {
    marginLeft: 40,
    marginTop: 40,
    fontSize: 13,
    fontFamily: 'OpenSans-Bold',
  },
  order: {
    marginTop: 25,
    marginLeft: 40,
    fontSize: 20,
    color: '#ff7527',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
  },
  products: {
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Regular',
  },
  final2: {
    marginTop: 40,
    marginLeft: 40,
    marginRight: 20,
    fontSize: 13,
    textAlign: 'center',
    color: '#ff7527',
    fontFamily: 'OpenSans-Bold',
  },
  sumUp: {
    marginTop: 40,
    marginLeft: 40,
    fontSize: 20,
    color: '#ff7527',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    fontSize: 14,
    marginLeft: 40,
    marginTop: 7,
    fontFamily: 'OpenSans-Regular',
  },
});

const InvoiceScheme = ({ invoiceDetails, products, totalPrice }) => {
  let currency = 'zł';
  let counter = 0;

  return (
    <Document title='Potwierdzenie zakupu' author='PGS Software'>
      <Page size='A4' style={styles.page}>
        <View>
          <Text style={styles.title}> Potwierdzenie zakupu towaru</Text>

          <Text style={styles.sellerInfo}>
            Sprzedawca: {'\n'}
            PGS Software {'\n'}
            ul. Sucha 3 {'\n'}
            50-068 Wrocław {'\n'}
            Polska {'\n'}
          </Text>

          <Text style={styles.order}>Twoje zamówienie {'\n'}</Text>

          {products.map((product) => {
            counter = counter + 1;
            return (
              <View>
                <Text style={styles.products}>
                  {counter}. {product.name} - {product.amount}(szt.) -{' '}
                  {product.price * product.amount}
                  {currency}
                </Text>
              </View>
            );
          })}

          <View>
            <Text style={styles.sumUp}>
              {'\n'}
              Podsumowanie
              {'\n'}
            </Text>

            <Text style={styles.text}>
              Kwota zamówienia: {totalPrice} {currency} {'\n'}
            </Text>

            <Text style={styles.text}>
              Kupujący: {invoiceDetails.firstName} {invoiceDetails.lastName}
              {'\n'}
              Nazwa firmy: {invoiceDetails.name} {'\n'}
              Adres:
              {invoiceDetails.street + ' ' + invoiceDetails.number + '\n'}
              Adres(2):
              {invoiceDetails.postalCode + ' ' + invoiceDetails.city + '\n'}
              Pesel/NIP: {invoiceDetails.nip} {'\n'}
              Telefon: {invoiceDetails.phoneNumber} {'\n'}
            </Text>
          </View>

          <Text style={styles.final2}>
            Dziekujemy za zakupy w PGS Internal Auction System i zapraszamy
            ponownie!
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceScheme;
