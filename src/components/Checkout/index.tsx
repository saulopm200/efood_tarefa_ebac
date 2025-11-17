import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

import { InputGroup, ButtonEntrega, Container } from './styles'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from '../../../src/services/store/reducers/index'
import { useNavigate } from 'react-router-dom'
import { formataPreco } from '../../components/PratosRestaurantes'
import { getTotalPrice } from '../../services/store/reducers/utils'
import { usePurchaseMutation } from '../../services/api'
//import { clear } from '@testing-library/user-event/dist/clear'

const Checkout = ({ setPayment }: { setPayment: (value: boolean) => void }) => {
  const [userAdress, setUserAdress] = useState(false)
  const [purchase, { isSuccess, data }] = usePurchaseMutation()
  const { items } = useSelector((state: RootReducer) => state.cart)
  const navigate = useNavigate()
  //const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      fullName: '',
      adress: '',
      city: '',
      cep: '',
      number: '',
      adressComplement: '',
      nameOwner: '',
      numberOwner: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: ''
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres.')
        .required('O campo é obrigatório.'),
      adress: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 5 caracteres')
        .required('Campo obrigatório!'),
      city: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 4 caracteres')
        .required('Campo obrigatório!'),
      cep: Yup.string()
        .matches(/^\d{5}-?\d{3}$/, 'CEP inválido. Use o formato 00000-000')
        .required('Campo obrigatório!'),
      number: Yup.string()
        .min(1, 'O campo precisa ter pelo menos 1 caractere')
        .required('Campo obrigatório!'),
      nameOwner: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 5 caracteres')
        .required('Campo obrigatório!'),
      numberOwner: Yup.string()
        .matches(
          /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
          'Número do cartão inválido. Use o formato 0000 0000 0000 0000'
        )
        .test(
          'card-number-length',
          'O número do cartão deve ter 16 dígitos',
          (value) => {
            if (!value) return false
            const digitsOnly = value.replace(/\s/g, '')
            return digitsOnly.length === 16
          }
        )
        .required('Campo obrigatório!'),
      cardCode: Yup.string()
        .min(3, 'O CVV deve ter 3 dígitos')
        .required('Campo obrigatório!'),
      expiresMonth: Yup.string()
        .min(1, 'O mês não pode ser menor que 1')
        .required('Campo obrigatório!'),
      expiresYear: Yup.string()
        .min(2, 'Ano inválido')
        .required('Campo obrigatório!')
    }),
    onSubmit: (values) => {
      purchase({
        delivery: {
          fullName: values.fullName,
          adress: {
            description: values.adress,
            city: values.city,
            zipCode: values.cep,
            number: Number(values.number),
            complement: values.adressComplement
          }
        },
        payment: {
          card: {
            name: values.nameOwner,
            number: values.numberOwner,
            code: Number(values.cardCode),
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        products: items.map((item) => ({
          id: item.id,
          price: item.preco as number
        }))
      })
    }
  })

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  const formAdressIsValid = () => {
    const isValid =
      !form.errors.fullName &&
      !form.errors.adress &&
      !form.errors.city &&
      !form.errors.cep &&
      !form.errors.number &&
      form.touched.adress

    if (isValid) {
      setUserAdress(true)
    } else {
      alert('Por favor, complete os dados de entrega corretamente.')
    }
  }

  const checkoutInputHasError = (fieldName: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors
    const hasError = isTouched && isInvalid

    return hasError
  }

  const confirmPayment = () => {
    form.handleSubmit()
    console.log('passou', form, isSuccess, data)
  }

  const finishPayment = () => {
    navigate('/')
    window.location.reload()
  }

  return (
    <Container>
      <form onSubmit={form.handleSubmit}>
        {userAdress && !isSuccess && (
          <>
            <h3>
              Pagamento - Valor a pagar {formataPreco(getTotalPrice(items))}
            </h3>
            <InputGroup>
              <label htmlFor="nameOwner">Nome no cartão</label>
              <input
                id="nameOwner"
                type="text"
                value={form.values.nameOwner}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={checkoutInputHasError('nameOwner') ? 'error' : ''}
              />
              <small>
                {getErrorMessage('nameOwner', form.errors.nameOwner)}
              </small>
            </InputGroup>
            <div className="displayFlex">
              <InputGroup>
                <label htmlFor="numberOwner">Número do cartão</label>
                <InputMask
                  id="numberOwner"
                  type="text"
                  value={form.values.numberOwner}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={
                    checkoutInputHasError('numberOwner') ? 'error' : ''
                  }
                  mask="9999 9999 9999 9999"
                />
                <small>
                  {getErrorMessage('numberOwner', form.errors.numberOwner)}
                </small>
              </InputGroup>
              <InputGroup className="maxWidth">
                <label htmlFor="cardCode">CVV</label>
                <InputMask
                  id="cardCode"
                  type="text"
                  value={form.values.cardCode}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkoutInputHasError('cardCode') ? 'error' : ''}
                  mask="999"
                />
                <small>
                  {getErrorMessage('cardCode', form.errors.cardCode)}
                </small>
              </InputGroup>
            </div>
            <div className="displayFlex">
              <InputGroup>
                <label htmlFor="expiresMonth">Mês de vencimento</label>
                <InputMask
                  id="expiresMonth"
                  type="text"
                  value={form.values.expiresMonth}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={
                    checkoutInputHasError('expiresMonth') ? 'error' : ''
                  }
                  mask="99"
                />
                <small>
                  {getErrorMessage('expiresMonth', form.errors.expiresMonth)}
                </small>
              </InputGroup>
              <InputGroup>
                <label htmlFor="expiresYear">Ano de vencimento</label>
                <InputMask
                  id="expiresYear"
                  type="text"
                  value={form.values.expiresYear}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={
                    checkoutInputHasError('expiresYear') ? 'error' : ''
                  }
                  mask="99"
                />
                <small>
                  {getErrorMessage('expiresYear', form.errors.expiresYear)}
                </small>
              </InputGroup>
            </div>
            <div className="button-container">
              <ButtonEntrega
                className="marginTop"
                type="button"
                title="clique aqui para finalizar a compra"
                onClick={confirmPayment}
              >
                Finalizar pagamento
              </ButtonEntrega>
              <ButtonEntrega type="button" onClick={() => setUserAdress(false)}>
                Voltar para edição de endereço
              </ButtonEntrega>
            </div>
          </>
        )}
        {!userAdress && !isSuccess && (
          <>
            <h3>Entrega</h3>
            <InputGroup>
              <label htmlFor="fullName">Quem irá receber</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={form.values.fullName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={checkoutInputHasError('fullName') ? 'error' : ''}
              />
              <small>{getErrorMessage('fullName', form.errors.fullName)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="adress">Endereço</label>
              <input
                id="adress"
                type="text"
                name="adress"
                value={form.values.adress}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={checkoutInputHasError('adress') ? 'error' : ''}
              />
              <small>{getErrorMessage('adress', form.errors.adress)}</small>
            </InputGroup>
            <InputGroup>
              <label htmlFor="city">Cidade</label>
              <input
                id="city"
                type="text"
                name="city"
                value={form.values.city}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                className={checkoutInputHasError('city') ? 'error' : ''}
              />
              <small>{getErrorMessage('city', form.errors.city)}</small>
            </InputGroup>
            <div className="spaceBetween">
              <InputGroup>
                <label htmlFor="cep">CEP</label>
                <InputMask
                  id="cep"
                  type="text"
                  name="cep"
                  value={form.values.cep}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkoutInputHasError('cep') ? 'error' : ''}
                  mask="99999-999"
                />
                <small>{getErrorMessage('cep', form.errors.cep)}</small>
              </InputGroup>
              <InputGroup>
                <label htmlFor="number">Número</label>
                <input
                  id="number"
                  type="text"
                  name="number"
                  value={form.values.number}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={checkoutInputHasError('number') ? 'error' : ''}
                />
                <small>{getErrorMessage('number', form.errors.number)}</small>
              </InputGroup>
            </div>
            <InputGroup>
              <label htmlFor="adressComplement">Complemento (opcional)</label>
              <input
                id="adressComplement"
                type="text"
                name="adressComplement"
                value={form.values.adressComplement}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </InputGroup>
            <div className="marginTop">
              <ButtonEntrega onClick={() => formAdressIsValid()}>
                Continuar com o pagamento
              </ButtonEntrega>
              <ButtonEntrega onClick={() => setPayment(false)}>
                Voltar para o carrinho
              </ButtonEntrega>
            </div>
          </>
        )}
      </form>
      {isSuccess && data && userAdress && (
        <Container>
          <h3>Pedido Realizado - {data?.orderId}</h3>
          <p>
            Estamos felizes em informar que seu pedido já está em processo de
            preparação e, em breve, será entregue no endereço fornecido.
          </p>
          <p>
            Gostaríamos de ressaltar que nossos entregadores não estão
            autorizados a realizar cobranças extras.
          </p>
          <p>
            Lembre-se da importância de higienizar as mãos após o recebimento do
            pedido, garantindo assim sua segurança e bem-estar durante a
            refeição.
          </p>
          <p>
            Esperamos que desfrute de uma deliciosa e agradável experiência
            gastronômica. Bom apetite!
          </p>
          <ButtonEntrega
            type="button"
            title="clique aqui para concluir sua compra"
            onClick={finishPayment}
          >
            Concluir
          </ButtonEntrega>
        </Container>
      )}
    </Container>
  )
}

export default Checkout
