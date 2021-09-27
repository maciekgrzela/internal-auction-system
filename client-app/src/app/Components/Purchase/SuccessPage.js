import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import consts from '../../Consts/consts.json';
import '../../Styles/App.css';
import { Link } from 'react-router-dom';
import { Header, Card, Grid, Button } from 'semantic-ui-react';
import InvoiceScheme from './InvoiceScheme';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import font1 from '../../Fonts/OpenSans-Regular.ttf';
import font2 from '../../Fonts/OpenSans-Bold.ttf';

Font.register({ family: 'OpenSans-Regular', src: font1 });
Font.register({ family: 'OpenSans-Bold', src: font2 });

const getTotalPrice = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.amount * product.price;
  });
  return total;
};

function SuccessPage() {
  let invoiceDetails = useLocation().state.invoiceDetails;
  let products = useLocation().state.products;
  let [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1);
  });

  return (
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Card fluid className='ias-rounded ias-py-1'>
            <Card.Content>
              <Card.Header>
                <Header
                  as='h1'
                  className='ias-thin ias-title ias-capitalize ias-pt-1'
                  dividing
                >
                  {consts.gratulation}
                </Header>
              </Card.Header>
              <p className='center ias-2x ias-orange-fg ias-m-1'>
                {consts.gratulationText}
              </p>

              <p className='center ias-1-5x ias-m-1'>{consts.invoice}</p>

              <Card.Description className='ias-pt-3'>
                <Button
                  color='red'
                  className='ias-mx-1 ias-rounded center ias-shadow'
                  size='medium'
                  floated='right'
                >
                  <Link to='/' className='ias-inverted up'>
                    {consts.back}
                  </Link>
                </Button>

                {ready === true ? (
                  <PDFDownloadLink
                    document={
                      <InvoiceScheme
                        invoiceDetails={invoiceDetails}
                        totalPrice={getTotalPrice(products)}
                        products={products}
                      />
                    }
                    fileName='PotwierdzenieZakupu.pdf'
                  >
                    <Button
                      color='red'
                      className='ias-mx-1 ias-rounded ias-shadow ias-orange-bg ias-white-fg'
                      size='medium'
                    >
                      <p className='up'> {consts.download} </p>
                    </Button>
                  </PDFDownloadLink>
                ) : (
                  <></>
                )}
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default SuccessPage;
