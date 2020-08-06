import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../server/api';
import './styles.css';

function TeacherForm () {

    const history = useHistory();

    // INPUTS
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWahtsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    //  ADD SCHEDULE
    const [scheduleItems, setscheduleItems] = useState([
        {week_day: 0, from: '', to: '',}
    ]); 

    function addNewScheduleItem() {
        setscheduleItems([
            ...scheduleItems, 
            {week_day: 0, from: '', to: '',}
        ]);
    }

    function setscheduleItemValue(position: number, field: string, value: string){
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setscheduleItems(updateScheduleItems);
    }

    async function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        const newClass = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost) ,
            schedule : scheduleItems,
        }

        await api.post('/classes', newClass).then(() => {
            toast.success('Cadastro realizado com sucesso');
            history.push('/');
        }).catch(() => {
            toast.error('Erro no cadastro!');
        })


    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que legal que você quer dar aulas"
            description="O primeiro passo é prencher o formulario de inscrição"
            />

            <main>
            <form onSubmit={handleCreateClass}> 
                <fieldset> <legend>Seus Dados</legend>
                    <Input name="name" label="Nome completo"  value={name} onChange={(e) => { setName(e.target.value) }}/>
                    <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => { setAvatar(e.target.value) }}/>
                    <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => { setWahtsapp(e.target.value) }}/>
                    <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                </fieldset>

                <fieldset> <legend>Sobre a aula</legend>

                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Ciências', label: 'Ciências'},
                            { value: 'Educação física', label: 'Educação física'},
                            { value: 'Fisíca', label: 'Fisíca'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'História', label: 'História'},
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Português', label: 'Português'},
                            { value: 'Química', label: 'Química'},
                        ]}
                        />
                    <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={(e) => { setCost(e.target.value) }}
                        />
                </fieldset>

                <fieldset> 
                    <legend> 
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}> 
                            + Novo horário
                        </button> 
                    </legend>

                        { scheduleItems.map((scheduleItem, index) => {
                            return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                name="week_day" 
                                label="Dia da semana"
                                value={scheduleItem.week_day}
                                onChange={e => setscheduleItemValue(index, 'week_day', e.target.value) }
                                options={[
                                    { value: '0', label: 'Domingo'},
                                    { value: '1', label: 'Segunda-feira'},
                                    { value: '2', label: 'Terça-feira'},
                                    { value: '3', label: 'Quarta-feira'},
                                    { value: '4', label: 'Quinta-feira'},
                                    { value: '5', label: 'Sexta-feira'},
                                    { value: '6', label: 'Sábado'},
                                ]}
                                />
                                <Input 
                                name="from" 
                                label="Das" 
                                type="time" 
                                value={scheduleItem.from}
                                onChange={e => setscheduleItemValue(index, 'from', e.target.value) }
                                />

                                <Input 
                                name="to" 
                                label="Até" 
                                type="time" 
                                value={scheduleItem.to}
                                onChange={e => setscheduleItemValue(index, 'to', e.target.value) }
                                />

                            </div>
                            )
                        }) }
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar Cadastro
                    </button>
                </footer>
            </form>
            </main>
        </div>
    )
}

export default TeacherForm;