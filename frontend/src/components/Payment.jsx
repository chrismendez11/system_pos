import React, { useEffect, useState } from 'react'
import './Payment.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useForm } from 'react-hook-form'

const defaultPayment = {
  createdAt: '',
  payday: '',
  documentNumber: 0,
  supplier: '',
  billNumber: 0,
  series: 0,
  amount: 0,
  billDate: '',
  description: ''
}

const Payment = () => {

  const [payments, setPayments] = useState([])

  const getPayments = () => {
    axios.get('http://localhost:3000/api/v1/payment/', getConfig())
      .then(res => {
        setPayments(res.data)
      })
      .catch(err => { console.log(err) })
  }

  useEffect(() => {
    getPayments()
  }, [])

  const { register, handleSubmit, reset } = useForm()

  const submit = (data) => {
    axios.post('http://localhost:3000/api/v1/payment/', data, getConfig())
      .then(res => {
        getPayments()
        reset(defaultPayment)
        alert('Nuevo pago agregado con exito!')
      })
      .catch(err => console.log(err))
  }

  const deletePayment = () => {
    axios.delete(`http://localhost:3000/api/v1/payment/${idSelected}`, getConfig())
      .then(res => {
        getPayments()
        setIdSelected(0)
        alert('Pago eliminado!')
      })
      .catch(err => console.log(err))
  }

  const [idSelected, setIdSelected] = useState(0)
  const [update, setUpdate] = useState(false)

  const updateSupplier = (data) => {
    axios.patch(`http://localhost:3000/api/v1/payment/${idSelected}`, data, getConfig())
      .then(res => {
        getPayments()
        setIdSelected(0)
        setUpdate(false)
        reset(defaultPayment)
        alert('El pago fue editado con exito!')
      })
      .catch(err => console.log(err))
  }

  const updateForm = () => {
    axios.get(`http://localhost:3000/api/v1/payment/${idSelected}`, getConfig())
      .then(res => {
        const payment = res.data
        const obj = {
          createdAt: payment.createdAt,
          payday: payment.payday,
          documentNumber: payment.documentNumber,
          supplier: payment.supplier,
          billNumber: payment.billNumber,
          series: payment.series,
          amount: payment.amount,
          billDate: payment.billDate,
          description: payment.description
        }
        reset(obj)
        setIdSelected(payment.id)
        setUpdate(true)
      })
      .catch(err => { console.log(err) })
  }

  return (
    <main className='dashboard__main payment__main'>
      <h1>CONTRASEÑA DE PAGO</h1>
      <div className='payment-sections__container'>
        <section className='payment-form__container'>
          <form onSubmit={idSelected ? handleSubmit(updateSupplier) : handleSubmit(submit)} className='payment-form__row'>
            <div><span>Fecha</span><input {...register('createdAt')} type="date" /></div>
            <div><span>Fecha de pago</span><input {...register('payday')} type="date" /></div>
            <div><span>No. Documento</span><input {...register('documentNumber')} type="number" /></div>
            <div><span>Proveedor</span><input {...register('supplier')} type="text" /></div>
            <div><span>No. Factura</span><input {...register('billNumber')} type="number" /></div>
            <div><span>Serie</span><input {...register('series')} type="number" /></div>
            <div><span>Monto</span><input {...register('amount')} type="number" /></div>
            <div><span>Fecha Factura</span><input {...register('billDate')} type="date" /></div>
            <div><span>Descripción</span><input {...register('description')} type="text" /></div>
            <button className='add-payment__btn'>{update ? 'Actualizar' : 'Nuevo'}</button>
          </form>
        </section>
        <section className='payments-info__container'>
          <article className='payments-info__title'>
            <div>No. Factura</div>
            <div>Serie</div>
            <div>Monto</div>
            <div>Fecha Factura</div>
            <div>Descripción</div>
          </article>
          {payments.map(payment => {
            const date = new Date(payment.billDate)

            return <article key={payment.id} className='payments-info' onClick={() => setIdSelected(payment.id)}>
              <div>{payment.billNumber}</div>
              <div>{payment.series}</div>
              <div>{payment.amount}</div>
              <div>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
              <div>{payment.description}</div>
            </article>
          })}
        </section>
        <section className='payment-btns__container supplier-btns__container'>
          <button onClick={updateForm} className='unique-btn'><i class="fa-solid fa-pen-to-square"></i></button>
          <button onClick={deletePayment} className='unique-btn delete-btn'><i class="fa-solid fa-trash-can"></i></button>
        </section>
      </div>
    </main>
  )
}

export default Payment