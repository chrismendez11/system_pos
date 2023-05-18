import React, { useEffect, useState } from 'react'
import './Movement.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useForm } from 'react-hook-form'

const defaultSupplierMovementForm = {
  typeOfMovement: '',
  documentNumber: 0,
  supplier: '',
  concept: '',
  costCenter: '',
  typeOfExpenditure: '',
  typeOfPayment: '',
  creditDays: 0,
  payday: '',
  createdAt: '',
  seriesDocument: 0,
  gas: false
}

const Movement = () => {

  const [suppliers, setSuppliers] = useState([])

  const getSuppliers = () => {
      axios.get('http://localhost:3000/api/v1/supplierMovement/', getConfig())
          .then(res => {
              setSuppliers(res.data)
          })
          .catch(err => { console.log(err) })
  }

  useEffect(() => {
      getSuppliers()
  }, [])

  const { register, handleSubmit, reset } = useForm()

  const submit = (data) => {
      axios.post('http://localhost:3000/api/v1/supplierMovement/', data, getConfig())
          .then(res => {
              getSuppliers()
              reset(defaultSupplierMovementForm)
              alert('Nuevo movimiento de proveedor agregado con exito!')
          })
          .catch(err => console.log(err))
  }

  const deleteSupplier = (id) => {
      axios.delete(`http://localhost:3000/api/v1/supplierMovement/${id}`, getConfig())
          .then(res => {
              getSuppliers()
              alert('Movimiento de proveedor eliminado!')
          })
          .catch(err => console.log(err))
  }

  const [updateId, setUpdateId] = useState(0)

  const updateSupplier = (data) => {
      axios.patch(`http://localhost:3000/api/v1/supplierMovement/${updateId}`, data, getConfig())
          .then(res => {
              getSuppliers()
              setUpdateId(0)
              reset(defaultSupplierMovementForm)
              alert('El movimiento de proveedor fue editado con exito!')
          })
          .catch(err => console.log(err))
  }

  const updateForm = (id) => {
      axios.get(`http://localhost:3000/api/v1/supplierMovement/${id}`, getConfig())
      .then(res => {
          const supplierMovement = res.data
          const obj = {
            typeOfMovement: supplierMovement.typeOfMovement,
            documentNumber: supplierMovement.documentNumber,
            supplier: supplierMovement.supplier,
            concept: supplierMovement.concept,
            costCenter: supplierMovement.costCenter,
            typeOfExpenditure: supplierMovement.typeOfExpenditure,
            typeOfPayment: supplierMovement.typeOfPayment,
            creditDays: supplierMovement.creditDays,
            payday: supplierMovement.payday,
            createdAt: supplierMovement.createdAt,
            seriesDocument: supplierMovement.seriesDocument,
            gas: supplierMovement.gas
          }
          reset(obj)
          setUpdateId(supplierMovement.id)
      })
      .catch(err => { console.log(err) })
  }

  return (
    <main className='dashboard__main supplier__main'>
      <h1>MOVIMIENTO DE PROVEEDORES</h1>
      <div className='supplier-sections__container'>
        <section className='supplier-form__container supplier-sect'>
          <form onSubmit={updateId ? handleSubmit(updateSupplier): handleSubmit(submit)}>
            <span>Tipo de movimiento:</span>
            <input {...register('typeOfMovement')} type="text" />
            <span>Número de documento:</span>
            <input {...register('documentNumber')} type="number" />
            <span>Proveedor:</span>
            <input {...register('supplier')} type="text" />
            <span>Concepto:</span>
            <input {...register('concept')} type="text" />
            <span>Centro de costo:</span>
            <input {...register('costCenter')} type="text" />
            <span>Tipo de gasto:</span>
            <input {...register('typeOfExpenditure')} type="text" />
            <span>Tipo de pago:</span>
            <input {...register('typeOfPayment')} type="text" />
            <span>Días de crédito:</span>
            <input {...register('creditDays')} type="number" />
            <span>Fecha estimada de pago:</span>
            <input {...register('payday')} type="date" />
            <span>Fecha del documento:</span>
            <input {...register('createdAt')} type="date" />
            <span>Serie del documento:</span>
            <input {...register('seriesDocument')} type="number" />
            <span>Combustible:</span>
            <input {...register('gas')} type="checkbox" value="false" />
            <button className='add-supplier__btn'>{updateId ? 'Actualizar' : 'Nuevo'}</button>
          </form>
        </section>
        <section className='suppliers-list__container supplier-sect'>
          <h2>Lista de movimientos</h2>
          <div className='suppliers__container'>
                        {suppliers.map(supplier => (
                            <article onClick={() => setUpdateId(supplier.id)} className='supplier' key={supplier.id}>
                                <span >{supplier.documentNumber}</span>
                                <span >{supplier.typeOfMovement}</span>
                                <span >{supplier.supplier}</span>
                                <div className='supplier-btns__container'>
                                    <button onClick={() => updateForm(supplier.id)} className='unique-btn'><i class="fa-solid fa-pen-to-square"></i></button>
                                     <button onClick={() => deleteSupplier(supplier.id)} className='unique-btn delete-btn'><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </article>
                        ))}
                    </div>
        </section>
      </div>
    </main>
  )
}

export default Movement