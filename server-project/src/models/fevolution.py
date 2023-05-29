class Evolution:
    def __init__(self, date, time, medical_diagnosis, full_name, document, date_birth, origin
                , eps, address, phone, position, time_linkage, club_home, additional_exercise
                , gender, day, activity_type, observation, approved):
        ''' 
        date = fecha
        time = hora
        medical_diagnosis = diagnóstico médico
        full_name = nombre completo
        document = documento
        date_birth = fecha de nacimiento
        origin = procedencia
        eps = eps
        address = direccion de residencia
        phone = telefono
        position = posición de juego
        time_linkage = tiempo de vinculación
        club_home = club de procedencia
        additional_exercise = ejercicio físico adicional
        gender = género
        day = jornada
        activity_type = tipo de actividad realizada
        observation = observación / interpretación
        approved = aprobado
        '''
        self.date = date
        self.time = time
        self.medical_diagnosis = medical_diagnosis
        self.full_name = full_name
        self.document = document
        self.date_birth = date_birth
        self.origin = origin
        self.eps = eps
        self.address = address
        self.phone = phone
        self.position = position
        self.time_linkage = time_linkage
        self.club_home = club_home
        self.additional_exercise = additional_exercise
        self.gender = gender
        self.day = day
        self.activity_type = activity_type
        self.observation = observation
        self.approved = approved

    def toDBCollection(self):
        return{
            "date":self.date,
            "time":self.time,
            "medical_diagnosis":self.medical_diagnosis,
            "full_name":self.full_name,
            "document":self.document,
            "date_birth":self.date_birth,
            "origin":self.origin,
            "eps":self.eps,
            "address":self.address,
            "phone":self.phone,
            "position":self.position,
            "time_linkage":self.time_linkage,
            "club_home":self.club_home,
            "additional_exercise":self.additional_exercise,
            "gender":self.gender,
            "day":self.day,
            "activity_type":self.activity_type,
            "observation":self.observation,
            "approved":self.approved
        }
