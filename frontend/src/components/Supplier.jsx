import React, { useEffect, useState } from 'react'
import './Supplier.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'

const defaultSupplierForm = {
    "company": '',
    "address": '',
    "phone": 0,
    "nit": 0,
    "email": '',
    "interestRate": 0,
    "creditDays": 0,
    "ledgerAccount": ''
}
const Supplier = () => {

    const [suppliers, setSuppliers] = useState([])

    const getSuppliers = () => {
        axios.get('http://localhost:3000/api/v1/supplier/', getConfig())
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
        axios.post('http://localhost:3000/api/v1/supplier/', data, getConfig())
            .then(res => {
                getSuppliers()
                reset(defaultSupplierForm)
                alert('Nuevo proveedor agregado con exito!')
            })
            .catch(err => console.log(err))
    }

    const deleteSupplier = (id) => {
        axios.delete(`http://localhost:3000/api/v1/supplier/${id}`, getConfig())
            .then(res => {
                getSuppliers()
                alert('Proveedor eliminado!')
            })
            .catch(err => console.log(err))
    }

    const [updateId, setUpdateId] = useState(0)

    const updateSupplier = (data) => {
        axios.patch(`http://localhost:3000/api/v1/supplier/${updateId}`, data, getConfig())
            .then(res => {
                getSuppliers()
                setUpdateId(0)
                reset(defaultSupplierForm)
                alert('El proveedor fue editado con exito!')
            })
            .catch(err => console.log(err))
    }

    const updateForm = (id) => {
        axios.get(`http://localhost:3000/api/v1/supplier/${id}`, getConfig())
        .then(res => {
            const supplier = res.data
            const obj = {
                  company: supplier.company,
                  address: supplier.address,
                  phone: supplier.phone,
                  nit: supplier.nit,
                  email: supplier.email,
                  interestRate: supplier.interestRate,
                  creditDays: supplier.creditDays,
                  ledgerAccount: supplier.ledgerAccount
            }
            reset(obj)
            setUpdateId(supplier.id)
        })
        .catch(err => { console.log(err) })
    }

    return (
        <main className='dashboard__main supplier__main'>
            <h1>CATALOGO DE PROVEEDORES</h1>
            <div className='supplier-sections__container'>
                <section className='supplier-form__container supplier-sect'>
                    <form onSubmit={updateId ? handleSubmit(updateSupplier): handleSubmit(submit)}>
                        <span>Empresa:</span>
                        <input {...register('company')} type="text" />
                        <span>Dirección:</span>
                        <input {...register('address')} type="text" />
                        <span>Teléfono:</span>
                        <input {...register('phone')} type="number" />
                        <span>Nit:</span>
                        <input {...register('nit')} type="number" />
                        <span>Email:</span>
                        <input {...register('email')} type="email" />
                        <span>Tasa de interés:</span>
                        <input {...register('interestRate')} type="number" />
                        <span>Días de créditos:</span>
                        <input {...register('creditDays')} type="number" />
                        <span>Cuenta contable:</span>
                        <input {...register('ledgerAccount')} type="text" />
                        <button className='add-supplier__btn'>{updateId ? 'Actualizar' : 'Nuevo'}</button>
                    </form>
                </section>
                <section className='suppliers-list__container supplier-sect'>
                    <h2>Lista de proveedores</h2>
                    <div className='suppliers__container'>
                        {suppliers.map(supplier => (
                            <article onClick={() => setUpdateId(supplier.id)} className='supplier' key={supplier.id}>
                                <span>{supplier.company}</span>
                                <span>{supplier.email}</span>
                                <span>{supplier.interestRate}</span>
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

export default Supplier