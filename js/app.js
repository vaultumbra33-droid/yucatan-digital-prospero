// ── Acceso por PIN ──────────────────────────────────────────
const correctPin = "8822";
const pinModal = document.getElementById('pinModal');
const mainSite = document.getElementById('mainSite');
const pinDigits = document.querySelectorAll('.pin-digit');
const pinSubmit = document.getElementById('pinSubmit');
const pinError = document.getElementById('pinError');

let currentPin = ['', '', '', ''];

pinDigits.forEach((digit, index) => {
    digit.addEventListener('input', (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = value;
        currentPin[index] = value;
        if (value && index < 3) pinDigits[index + 1].focus();
        if (value) digit.classList.add('filled');
        else digit.classList.remove('filled');
        pinError.textContent = '';
    });
    digit.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            if (!e.target.value && index > 0) {
                pinDigits[index - 1].focus();
                pinDigits[index - 1].value = '';
                currentPin[index - 1] = '';
                pinDigits[index - 1].classList.remove('filled');
            }
            currentPin[index] = '';
            digit.classList.remove('filled');
        }
    });
});

pinSubmit.addEventListener('click', checkPin);
document.addEventListener('keydown', (e) => {
    if (pinModal.classList.contains('active') && e.key === 'Enter') checkPin();
});

function checkPin() {
    const entered = currentPin.join('');
    if (entered.length < 4) { pinError.textContent = 'Ingrese los 4 dígitos'; return; }
    if (entered === correctPin) {
        pinModal.style.transition = 'opacity 0.5s ease';
        pinModal.style.opacity = '0';
        setTimeout(() => {
            pinModal.classList.remove('active');
            mainSite.classList.add('active');
            document.body.style.overflow = 'auto';
            window.scrollTo(0, 0);
        }, 500);
    } else {
        pinError.textContent = 'PIN incorrecto. Intente nuevamente.';
        const content = pinModal.querySelector('.pin-modal-content');
        content.style.animation = 'shake 0.5s ease';
        setTimeout(() => { content.style.animation = 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)'; }, 500);
        pinDigits.forEach((d,i)=>{ d.value=''; currentPin[i]=''; d.classList.remove('filled'); });
        pinDigits[0].focus();
    }
}

setTimeout(() => { if (pinModal.classList.contains('active')) pinDigits[0].focus(); }, 150);

// ── Navegación ──────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if (href === '#') { e.preventDefault(); return; }
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navH = document.querySelector('.navbar').offsetHeight;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - navH;
        window.scrollTo({ top: pos, behavior: 'smooth' });
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 40) {
        navbar.style.background = 'rgba(10, 30, 58, 0.995)';
        navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.35)';
    } else {
        navbar.style.background = 'rgba(10, 30, 58, 0.985)';
        navbar.style.boxShadow = '0 8px 24px rgba(10,30,58,0.12)';
    }
});

// ── Datos de los 13 proyectos ───────────────────────────────
const projectData = {
    P1: {
        id: 'P1',
        title: 'Ventanilla Única Digital e Identidad Ciudadana Yucateca',
        subtitle: 'Gobierno Digital y Recaudación',
        problem: 'Trámites dispersos entre dependencias y canales, con presencia de gestores e intermediarios, y exigencia de documentos en papel. La población del interior debe trasladarse a Mérida para muchos servicios.',
        solution: 'Portal y app móvil únicos donde la persona se identifica una vez y realiza los trámites estatales, con pago en línea, seguimiento en tiempo real y documentos digitales con validez jurídica (firma electrónica avanzada y sello digital con código QR verificable).',
        components: ['Cartera de documentos digitales (constancias, licencia, pagos)', 'Firma electrónica y sello digital verificable por terceros', 'Catálogo estatal de trámites simplificados y expediente único', 'Modo asistido en módulos y en municipios, con atención en maya yucateco', 'Asistente con IA 24/7 para orientar trámites'],
        impactEco: 'Reduce fuga por intermediarios; aumenta el cobro de derechos al digitalizar el pago; libera personal para tareas de fiscalización.',
        impactSoc: 'Menos traslados desde comunidades alejadas; menor costo de oportunidad para hogares rurales; acceso en lengua maya.',
        model: 'Licenciamiento SaaS o desarrollo a medida con soporte anual; posible esquema por transacción. Debe alinearse a la normativa estatal de firma electrónica y a la Subsecretaría de TIC.',
        investment: 'Media (software, integración y capacitación).',
        pilot: '5 a 10 trámites de mayor volumen en Mérida y un municipio del interior durante 90 a 120 días.',
        indicators: ['Trámites 100% en línea', 'Tiempo promedio de resolución', '% de pagos digitales', 'Reducción de quejas'],
        risks: ['Conectividad rural', 'Interoperabilidad con sistemas existentes', 'Protección de datos personales']
    },
    P2: {
        id: 'P2',
        title: 'Licencia de Conducir, Tránsito y Padrón Vehicular Digital',
        subtitle: 'Gobierno Digital y Recaudación',
        problem: 'La licencia se tramita en módulos de la SSP con validación documental presencial de exenciones [9]. Un trámite vehicular, el cambio de propietario, acumuló unas 40 mil citas en 2026 según la AAFY [3], lo que sugiere demanda alta y filas. El padrón vehicular puede tener información incompleta.',
        solution: 'Licencia de conducir digital con QR verificable por agentes, citas inteligentes, validación automática de exenciones del Decreto 143/2025 y cobro de refrendos y multas en línea y en comercios, con depuración del padrón vehicular mediante analítica.',
        components: ['Licencia y tarjeta de circulación digitales en cartera móvil', 'Motor de recordatorios y cobro de refrendo y multas', 'Verificación de documentos por agentes con app móvil, incluso sin conexión', 'Cruce con padrones de becas, pensiones y DIF para exenciones', 'Interconexión con el registro de concesiones de transporte'],
        impactEco: 'Mayor cumplimiento en refrendo, derechos y multas; menos fraude documental; nuevos ingresos por servicios digitales.',
        impactSoc: 'Menos filas y gestores; transparencia en infracciones; apoyo más ágil a quien tiene derecho a exención.',
        model: 'Servicio tecnológico por transacción o por usuario activo; cualquier componente ligado a incremento de recaudación está sujeto a revisión jurídica.',
        investment: 'Baja a media.',
        pilot: 'Licencia digital y pago de refrendo en Mérida durante 90 días.',
        indicators: ['% de licencias emitidas digitalmente', 'Recaudación por refrendo', 'Tiempo de atención', 'Casos de fraude detectados'],
        risks: ['Resistencia de intermediarios y personal', 'Marco legal de credenciales digitales', 'Evitar incentivos perversos en esquemas ligados a multas']
    },
    P3: {
        id: 'P3',
        title: 'Registro Público, Catastro y Escritura Digital (Nexum)',
        subtitle: 'Gobierno Digital y Recaudación',
        problem: 'INSEJUPY ya cuenta con folio electrónico, cartografía digital y Notaría Digital [10]. Persisten áreas de oportunidad en la actualización permanente de valores y construcciones, la homologación de procesos en 106 municipios y los servicios de protección patrimonial al ciudadano.',
        solution: 'Escritura digital por capas: se mantiene la escritura pública y la fe del notario, y se digitaliza el ciclo alrededor (preparación, firma, ingreso, registro, consulta, certificados y protección del propietario), con una capa de inteligencia catastral que complementa lo existente.',
        components: ['Detección de cambios con imágenes aéreas y drones: construcciones nuevas o ampliaciones no registradas', 'Valuación masiva asistida con modelos estadísticos y comparables', 'Plataforma municipal estandarizada para predial y trámites catastrales', 'Expediente notarial digital con firma electrónica, sellado de tiempo y verificación por QR, integrado a la Notaría Digital existente', 'Alerta registral al propietario ante cualquier movimiento sobre su predio, como herramienta contra despojo y fraude', 'Programas masivos de regularización (escrituración y testamentos)'],
        impactEco: 'Base fiscal inmobiliaria actualizada; mayor ingreso por derechos registrales y certificados; mejor base del predial municipal mediante convenios; facilita crédito hipotecario e inversión.',
        impactSoc: 'Protege el patrimonio, reduce despojo y duplicidad de escrituras, y apoya a municipios pequeños.',
        model: 'Contrato por fases (levantamiento, plataforma, ventanilla); licencia anual; alerta patrimonial como suscripción opcional; posible participación en ingresos incrementales por derechos, a validar jurídicamente.',
        investment: 'Media a alta (el levantamiento y la depuración son lo más intensivo).',
        pilot: 'Uno o dos municipios y un grupo de notarías, con certificado digital y alerta al propietario, en 4 a 6 meses.',
        indicators: ['Predios actualizados', 'Incremento de base catastral', 'Tiempo de inscripción y de certificado', 'Intentos de fraude detectados', 'Municipios incorporados'],
        risks: ['Interoperabilidad con los sistemas actuales', 'Resistencia notarial (avanzar con su participación)', 'Regulación de vuelos con drones', 'Propiedad social y ejidal, que requiere tratamiento específico']
    },
    P4: {
        id: 'P4',
        title: 'Motor Inteligente de Recaudación y Cumplimiento Gradual',
        subtitle: 'Gobierno Digital y Recaudación',
        problem: 'La AAFY ya cuenta con tableros de control y resultados positivos [3]. El siguiente salto es pasar de monitorear a anticipar y facilitar: identificar omisos, priorizar acciones y reducir la fricción de pago, sin crear nuevos impuestos.',
        solution: 'Plataforma de inteligencia fiscal que cruza padrones (negocios, vehículos, nómina, hospedaje, registro, concesiones) para identificar omisión y brechas, combinada con cobranza omnicanal y una ruta de formalización gradual con incentivos de cumplimiento.',
        components: ['Cruce de datos y analítica para impuesto sobre nómina, hospedaje, derechos y refrendos', 'Cobranza por WhatsApp, SMS y correo; ligas y QR de pago; convenios de pago en parcialidades automatizados', 'Puntos de pago en comercios de barrio (conectado con P7)', 'Incentivos por cumplimiento puntual (puntos, descuentos, sorteos)', 'Asistente fiscal con IA y tablero ejecutivo para Finanzas'],
        impactEco: 'Es el proyecto con mayor potencial de incremento de ingresos propios; cada punto de mejora sobre la meta local de 8,180 mdp equivale a unos 82 mdp anuales [2] (ejercicio aritmético, no proyección).',
        impactSoc: 'Formalización amigable que abre acceso a crédito y seguridad social a microempresas; menos manejo de efectivo.',
        model: 'Servicio administrado: tarifa fija con componente variable sobre incremento verificado, sujeto a opinión jurídica y auditoría independiente. Las facultades de fiscalización y cobro permanecen en la autoridad fiscal.',
        investment: 'Media; los puntos de pago pueden financiarse con comisión por transacción.',
        pilot: 'Un padrón sectorial (hospedaje o nómina) y 200 a 500 puntos de pago en Mérida y otra ciudad.',
        indicators: ['Incremento de recaudación frente a línea base', 'Contribuyentes nuevos', 'Tasa de pago puntual', 'Costo de cobranza'],
        risks: ['Percepción de «recaudatorio» sin beneficios visibles', 'Protección de datos fiscales', 'Necesidad de convenios con SAT y municipios', 'Calidad de datos de origen']
    },
    P5: {
        id: 'P5',
        title: 'Credencial QR de Transporte, Recaudo Electrónico y Autopago',
        subtitle: 'Movilidad y Transporte',
        problem: 'El pasaje y la conciliación de ingresos dependen de mediciones que los actores consideran difíciles de verificar. Las tarifas sociales (estudiantes, adultos mayores, personas con discapacidad) requieren control confiable y los mototaxis y taxis del interior operan con poca trazabilidad [8].',
        solution: 'Credencial de transporte con QR y tarjeta, red de recarga y autopago, y registro y licencia digital para operadores de taxi, mototaxi, transporte colectivo y plataformas.',
        components: ['Credencial con QR y perfil de tarifa; compatible con tarjeta bancaria sin contacto', 'Cajeros de autopago en terminales y plazas, y recarga en la red de POS comunitarios (P7)', 'Validadores a bordo de bajo costo con GPS y conteo de pasajeros, con modo sin conexión', 'Licencia digital del operador y de la unidad (vigencia, seguro, aptitud)', 'Registro de plataformas de transporte con reglas de seguridad y aportaciones, donde la normativa lo prevea'],
        impactEco: 'Reduce la fuga de efectivo, da trazabilidad para derechos de concesión y subsidios verificables, y crea ingresos por comisión de recarga.',
        impactSoc: 'Tarifa social comprobable, mayor seguridad para el usuario y un gremio más formalizado.',
        model: 'Concesión de servicio de recaudo (el operador instala equipos y cobra comisión sobre recarga) y contrato de servicios para el registro digital. Los equipos no tienen costo para el estado.',
        investment: 'Baja a media en credencial, recarga y registro; media en validadores y cajeros.',
        pilot: '3 a 5 rutas del Va y Ven y un municipio con mototaxis, durante 4 a 6 meses, con efectivo todavía permitido.',
        indicators: ['% de viajes pagados con la credencial', 'Reducción de efectivo', 'Tarifas sociales verificadas', 'Mototaxis registrados'],
        risks: ['Resistencia de quienes manejan el efectivo', 'Exclusión de usuarios sin tarjeta o celular (mantener efectivo y recarga asistida)', 'Privacidad de datos de viaje']
    },
    P6: {
        id: 'P6',
        title: 'Va y Ven: Verificación de Kilómetros, Flota y Concesiones Complementarias',
        subtitle: 'Movilidad y Transporte',
        problem: 'El Va y Ven creció más de 40% en pasajeros diarios [5], pero su sostenibilidad financiera ha generado tensiones: adeudos reportados por 189 mdp, reducciones de flota y paros [6][7]. El nuevo modelo de pago por kilómetros efectivamente recorridos [5] exige mediciones que todas las partes consideren confiables.',
        solution: 'Capa tecnológica neutral de medición y conciliación, más fuentes de ingreso no tarifario y, a mediano plazo, financiamiento de flota moderna (incluida eléctrica) con el recaudo digital como garantía de pago.',
        components: ['Telemetría GPS y odometría auditable que alimente la conciliación de kilómetros y los pagos; tablero compartido entre ATY, Finanzas y concesionarios', 'Aplicación ciudadana con tiempos de llegada reales y datos abiertos de movilidad', 'Concesiones complementarias que se financian solas: publicidad en unidades y paraderos, paraderos inteligentes, estacionamiento regulado con parquímetros digitales y carga eléctrica', 'Esquema de arrendamiento o financiamiento de unidades para concesionarios actuales, con patio de carga con paneles solares (conectado con P9)', 'Ruta troncal piloto eléctrica y, si los datos lo justifican, proyecto masivo por asociación público-privada'],
        impactEco: 'Menos disputas por mediciones, pagos más oportunos, ingresos no tarifarios que reducen la dependencia del erario, y ahorro de combustible y mantenimiento que paga el financiamiento.',
        impactSoc: 'Transporte más confiable, limpio y silencioso; mejor calidad del aire en la zona metropolitana.',
        model: 'Contrato por desempeño para telemetría y conciliación; concesión o APP para estacionamiento, publicidad y carga; financiamiento a concesionarios con banca y proveedor de vehículos.',
        investment: 'Baja a media para telemetría; alta para flota (requiere financiamiento externo y estudio de viabilidad).',
        pilot: '3 a 5 rutas para telemetría (90 a 120 días); la flota eléctrica solo después de que el recaudo electrónico esté funcionando.',
        indicators: ['Discrepancia entre kilómetros reportados y verificados', 'Días de pago a concesionarios', 'Ingresos no tarifarios', 'Costo por kilómetro', 'Puntualidad'],
        risks: ['Sensibilidad política y gremial', 'Coordinación con el Decreto 187/2026 y la nueva ley', 'Resistencia a la medición', 'Respeto a los derechos de concesionarios vigentes', 'Sostenibilidad de tarifas']
    },
    P7: {
        id: 'P7',
        title: 'Red de POS Comunitario: Autocobro en Tortillerías y Abarrotes',
        subtitle: 'Economía Local y Pagos',
        problem: 'Las tortillerías y abarrotes son el comercio más cercano a la población, pero muchos operan sin pagos digitales, sin crédito formal y con cadenas de proveeduría largas. El nivel de uso de efectivo en Yucatán debe medirse localmente; no se extrapolan cifras de otros estados.',
        solution: 'Red de POS gratuitos en comodato que permite cobrar pagos digitales, recibir pagos de trámites, servicios y recargas, y conectarse con la producción local, con una comisión privada de centavos por operación.',
        components: ['POS gratuito en comodato; el equipo se financia con las comisiones', 'Autocobro de trámites, derechos, agua, luz, recargas y remesas en la tienda de barrio', 'Convenio de recaudación con ayuntamientos y con la AAFY', 'Proveeduría local: conexión de abarrotes con productores de Yucatán, impulsando la marca local', 'Crédito de capital de trabajo basado en el historial de ventas'],
        impactEco: 'Ingresos por comisión sin costo para el gobierno; más circulación de dinero local; formalización gradual de micronegocios; menos fuga de efectivo en trámites.',
        impactSoc: 'Pagos y servicios cerca de casa, menos traslados y filas, crédito para el pequeño comerciante y mejor precio de surtido.',
        model: 'Comisión privada por operación con bancos aliados, hardware financiado con las comisiones, posible ingreso por proveeduría y crédito. Los trámites de autorización se realizan con cada ayuntamiento y la banca aliada.',
        investment: 'Baja a media; la recuperación depende del volumen de operaciones por comercio (ver sección 7.2 del documento).',
        pilot: 'Una zona de Mérida y un municipio del interior con 200 a 500 comercios durante 4 a 6 meses.',
        indicators: ['Comercios activos', 'Operaciones al día', 'Meses de recuperación del equipo', 'Pagos municipales recibidos', 'Pedidos a productores locales', 'Créditos otorgados'],
        risks: ['Competencia de terminales existentes (Mercado Pago, Clip, bancos)', 'Temor del comerciante a la visibilidad fiscal', 'Autorización financiera si los fondos pasan por cuentas propias (operar con banco aliado)', 'Seguridad del personal en campo']
    },
    P8: {
        id: 'P8',
        title: 'Agua Inteligente y Energía Solar para Bombeo',
        subtitle: 'Servicios Básicos y Energía',
        problem: 'Los organismos operadores enfrentan pérdidas por fugas, facturación por promedio y cartera vencida, y el consumo eléctrico del bombeo es un gasto principal (dato por validar). El acuífero kárstico de Yucatán hace que cada fuga y cada extracción ineficiente tenga un costo ambiental, además del financiero.',
        solution: 'Medición digital, pago por QR o en la red de POS, detección de fugas y energía solar para abastecer las bombas, con un mínimo vital garantizado.',
        components: ['Medidores inteligentes con lectura remota y alertas de fuga y manipulación', 'Pago por QR, NFC o en la red de POS; prepago solo voluntario', 'Mínimo vital garantizado y restricción de caudal en lugar de corte total', 'Sensores de presión y continuidad', 'Plantas solares para bombeo, financiadas con el ahorro de electricidad'],
        impactEco: 'Mejora el cobro, reduce pérdidas y baja el mayor gasto energético de la operación; el ahorro puede financiar la inversión.',
        impactSoc: 'Cobro justo por consumo real, detección de fugas y mejor continuidad del servicio.',
        model: 'Convenio con cada organismo operador; ahorro compartido o arrendamiento de la infraestructura solar y de medición, pagado con el ahorro y el incremento de cobro.',
        investment: 'Media a alta (equipos solares y medidores).',
        pilot: 'Un sistema de bombeo en Mérida o en un municipio, con medición a grandes consumidores y comercios.',
        indicators: ['Ahorro de energía (kWh y pesos)', 'Agua facturada contra producida', 'Cartera vencida', 'Horas de servicio continuo'],
        risks: ['Sensibilidad social y legal del cobro de agua', 'Calidad de la red', 'Robo de paneles y medidores', 'Dependencia del convenio municipal']
    },
    P9: {
        id: 'P9',
        title: 'Financiamiento Energético para Ayuntamientos',
        subtitle: 'Servicios Básicos y Energía',
        problem: 'Los ayuntamientos destinan una parte relevante de su presupuesto a la electricidad del alumbrado, los edificios y el bombeo, y no siempre cuentan con liquidez para modernizar su consumo.',
        solution: 'Programa de crédito o ahorro compartido para que los ayuntamientos reduzcan su consumo con luminarias LED, medición inteligente y energía solar, pagando el financiamiento con el ahorro generado.',
        components: ['Diagnóstico energético municipal y línea base de consumo', 'Sustitución por luminarias LED con control remoto', 'Solar para edificios y bombeo (conectado con P8)', 'Crédito con banca aliada o ahorro compartido atado al ahorro', 'Tablero de consumo y pagos por municipio'],
        impactEco: 'Libera presupuesto municipal, reduce adeudos con la empresa eléctrica y abre un mercado de servicios energéticos.',
        impactSoc: 'Calles mejor iluminadas y servicios públicos más estables.',
        model: 'Ahorro compartido, arrendamiento o crédito con banca aliada; debe revisarse con un abogado cómo se clasifica frente a las reglas de deuda pública municipal.',
        investment: 'Media; se financia con el propio ahorro.',
        pilot: 'Dos o tres municipios con alumbrado y bombeo relevantes, durante 6 a 12 meses.',
        indicators: ['Ahorro energético y monetario', 'Reducción del adeudo', 'Luminarias modernizadas', 'Cumplimiento de pagos'],
        risks: ['Capacidad de pago y autorizaciones municipales', 'Reglas de deuda pública', 'Cambios tarifarios']
    },
    P10: {
        id: 'P10',
        title: 'Yucatán Conectado: WiFi Público y Publicidad Digital (ENLACE 360)',
        subtitle: 'Servicios Básicos y Energía',
        problem: 'Existe una brecha marcada entre la capital y el interior [12]; Mérida cuenta con 240 puntos de WiFi gratuito [13], pero los municipios con menor conectividad requieren soluciones adicionales y sostenibles, y la brecha de calidad pesa más que la de cobertura [16].',
        solution: 'Red WiFi pública en plazas, mercados, centros de salud, paraderos y espacios comunitarios de los municipios de menor conectividad, financiada con publicidad local y servicios, como complemento de Yucatán Digital y Mérida Digital.',
        components: ['Puntos WiFi públicos con portal de acceso y servicios del Estado: trámites, alertas de Protección Civil ante huracanes y campañas de salud', 'Red de publicidad digital local para comercios y emprendedores del municipio', 'Medición agregada y anónima de uso para planeación', 'Alfabetización digital vinculada a la red', 'Distribución de acceso por la red de POS comunitaria (P7)'],
        impactEco: 'Ingreso publicitario que financia la operación; apoyo al comercio local; canal directo de comunicación gubernamental sin costo de capital para el Estado.',
        impactSoc: 'Acceso a información, educación y servicios en municipios del interior, con alertas ante contingencias.',
        model: 'Concesión o convenio de uso de espacios públicos: ENLACE 360 invierte y opera; el Estado aporta permisos, sitios y, de ser posible, energía; contraprestación o cuota de pantallas para mensajes gubernamentales.',
        investment: 'Nula o baja para el Estado.',
        pilot: '3 a 5 municipios del interior durante 90 a 120 días.',
        indicators: ['Municipios y puntos activos', 'Usuarios únicos mensuales', 'Mensajes de Protección Civil entregados', 'Ingresos publicitarios locales'],
        risks: ['Mantenimiento en zonas dispersas', 'Disponibilidad de conectividad de respaldo', 'Protección de datos personales', 'Sostenibilidad si la demanda publicitaria local es baja']
    },
    P11: {
        id: 'P11',
        title: 'App de Gobierno para Todos los Ciudadanos (trámites, pagos y reportes)',
        subtitle: 'Gobierno Digital y Recaudación',
        problem: 'Las personas recorren varias dependencias y canales para tramitar, pagar o reportar problemas; los reportes de servicios y seguridad no siempre tienen un canal único con seguimiento.',
        solution: 'App y portal únicos de gobierno con trámites, pagos y seguimiento, más reportes y denuncias desde el celular, atendidos por un centro de atención con atención en maya yucateco.',
        components: ['Trámites y pagos con seguimiento (conectado con P1 y P7)', 'Reportes ciudadanos con foto: baches, alumbrado, basura y fallas de agua', 'Denuncias y atención por voz y mensaje, con relevo seguro de llamadas para proteger la identidad', 'Alertas de Protección Civil por huracán, lluvia y contingencias', 'Atención en maya yucateco y modo asistido'],
        impactEco: 'Más cumplimiento por facilidad de pago; menor costo de atención con automatización.',
        impactSoc: 'Canal único y cercano con el gobierno, con seguimiento de cada reporte.',
        model: 'Licenciamiento de la plataforma y servicio de atención por llamada o por usuario atendido. Las decisiones sobre alcance y operación corresponden a las autoridades.',
        investment: 'Media.',
        pilot: 'Un municipio y 5 a 10 trámites y tipos de reporte durante 90 días.',
        indicators: ['Usuarios activos', 'Reportes atendidos', 'Tiempo de respuesta', 'Satisfacción', '% de pagos desde la app'],
        risks: ['Coordinación con el 911 y con la telefonía tradicional como respaldo', 'Registro de evidencia con consentimiento', 'Protección de datos']
    },
    P12: {
        id: 'P12',
        title: 'Pase Turístico, App del Turista y Registro Único de Hospedaje',
        subtitle: 'Turismo y Salud',
        problem: 'Yucatán recibe millones de turistas [23], pero la experiencia está fragmentada y el gasto se captura de forma parcial. Más de 12 mil alojamientos en plataformas operan sin regulación plena y el sector hotelero pide «piso parejo» [14]; el Gobierno prepara reformas a la Ley de Turismo [14].',
        solution: 'Pase turístico prepagado y app del turista, junto con un Registro Estatal Digital de Prestadores de Hospedaje con folio único visible en los anuncios.',
        components: ['Pase prepagado de boletaje, transporte y consumo en comercios aliados (cenotes, zonas arqueológicas, museos, haciendas, Pueblos Mágicos)', 'Promoción de rutas hacia el interior del estado, no solo Mérida', 'Registro digital de hospedaje vinculado a AAFY, Protección Civil y Sefotur; monitoreo de anuncios públicos y conciliación con la base de contribuyentes', 'Convenios técnicos con plataformas para retención o intercambio de información, donde la ley lo permita', 'Inteligencia de destino: ocupación, flujo por municipio, estacionalidad y gasto (con base en el sistema Simty existente)'],
        impactEco: 'Saldo prepagado que trae dinero fresco; comisiones por consumo; mayor certeza en el Impuesto sobre Hospedaje (tasa de 4.5% en 2026 [14]).',
        impactSoc: 'Ingreso para guías, artesanos y prestadores locales con pago rápido y visibilidad; seguridad para el visitante.',
        model: 'Plataforma con comisión por venta del pase y consumo; alianzas con transportistas y prestadores; registro de hospedaje como servicio al Estado; todo sujeto a la reforma legal en curso.',
        investment: 'Media.',
        pilot: 'Una ruta turística hacia el interior en temporada alta y el registro de hospedaje en Mérida.',
        indicators: ['Pases vendidos', 'Gasto por turista', 'Alojamientos registrados y con folio visible', 'Recaudación del hospedaje', 'Satisfacción'],
        risks: ['Dependencia de la reforma legislativa', 'Cooperación de plataformas', 'Estacionalidad', 'Competencia con plataformas de reserva existentes', 'Protección de datos de anfitriones y huéspedes']
    },
    P13: {
        id: 'P13',
        title: 'Yucatán Health Hub: Turismo Médico, Telemedicina y Salud Digital',
        subtitle: 'Turismo y Salud',
        problem: 'Yucatán tiene hospitales privados, médicos especialistas, un clúster, un portal de promoción y vuelos directos con Estados Unidos y Canadá [19][20][21][22], pero compite con Cancún, Monterrey, Guadalajara y la frontera norte. Las brechas reportadas son el personal bilingüe, la certificación internacional (Joint Commission), la adaptación de hospedaje y la falta de datos y regulación [18][20][25]. La atención en los municipios alejados depende de la conectividad de los centros de salud [12].',
        solution: 'Plataforma público-privada con dos vías que comparten tecnología: (A) turismo médico ordenado y verificable para pacientes extranjeros y nacionales, y (B) telemedicina y salud digital para el interior del estado. Los ingresos del turismo médico ayudan a sostener la inversión en la vía B.',
        components: ['Directorio y sello «Yucatán Health Verified»: verificación de cédulas, licencias sanitarias y certificaciones de médicos, clínicas y hospitales, con transparencia de precios por paquete y reseñas verificadas', 'Portal y app multilingüe (inglés y francés): cotización, agenda, expediente clínico portable, consentimientos y pago prepagado, ampliando el portal oficial Yucatán Healthcare', 'Paquete integral: vuelo, traslados, hospedaje adaptado a recuperación, asistente bilingüe, transporte y estancia, conectado con el pase turístico (P12) y la red de transporte (P5)', 'Telemedicina transfronteriza: consulta previa y seguimiento posoperatorio a distancia con el médico de origen, y gestión de seguros y de complicaciones', 'Programa de capacitación y certificación: formación de facilitadores y personal bilingüe con universidades locales, y ruta de acompañamiento a hospitales que buscan acreditación internacional', 'Especialidades de arranque: odontología e implantes, cirugía maxilofacial, cirugía estética y reconstructiva y cardiología [19]', 'Vía B, salud digital interior: estaciones de teleconsulta en clínicas rurales con especialistas en Mérida, agenda unificada, receta electrónica y trazabilidad de abasto de medicamentos', 'Observatorio: tablero de pacientes, procedencia, especialidad, estancia y derrama [25]'],
        impactEco: 'El valor principal es económico (hospedaje, transporte, comercio, servicios y empleo calificado) y de posicionamiento, más que recaudatorio directo; hay ingresos fiscales indirectos por Impuesto sobre Hospedaje, nómina y derechos. Escenario hipotético de trabajo (no proyección): 2,000 pacientes extranjeros al año × gasto total promedio de USD 5,000 = USD 10 millones anuales de derrama.',
        impactSoc: 'Empleo calificado en salud y servicios; ingreso para clínicas y hospitales que puede reinvertirse en equipo y capacitación; telemedicina que reduce traslados y ausentismo en el interior. Se recomienda un convenio de reinversión parcial de ingresos en salud pública.',
        model: 'Plataforma con comisión por paquete y por servicio verificado; membresía anual del sello para prestadores; contrato de servicio por clínica conectada para la vía B; participación opcional del Estado en la promoción. Figura público-privada que incluya a Sefotur, el clúster médico, cámaras y hospitales.',
        investment: 'Media (plataforma, verificación y promoción); la certificación hospitalaria la financian los propios hospitales.',
        pilot: 'Tres especialidades, 5 a 8 prestadores verificados y 2 hoteles adaptados, con vuelos de temporada de invierno (hasta abril de 2027), más 5 a 10 clínicas rurales para teleconsulta. Duración: 4 a 6 meses.',
        indicators: ['Prestadores verificados', 'Pacientes internacionales atendidos y procedencia', 'Estancia y gasto promedio', 'Satisfacción y complicaciones', 'Teleconsultas en el interior', 'Personal bilingüe capacitado', 'Hospitales en ruta de acreditación'],
        risks: ['Riesgo reputacional ante una mala práctica (por eso el sello y los seguros de complicaciones)', 'Regulación sanitaria y publicidad de servicios médicos (COFEPRIS)', 'No desplazar la atención a la población local', 'Competencia de otros destinos', 'Dependencia de rutas aéreas', 'Seguridad y privacidad de datos clínicos', 'Marco legal del uso de seguros extranjeros']
    }
};

// ── Fichas completas integradas en la página ────────────────
function ffSection(icon, title, bodyHtml, isList) {
    return `
        <section class="ff-section">
            <h4><i class="fas ${icon}"></i> ${title}</h4>
            ${isList ? `<ul>${bodyHtml}</ul>` : `<p>${bodyHtml}</p>`}
        </section>`;
}

function renderFullFichas() {
    Object.values(projectData).forEach(d => {
        const article = document.getElementById(`ficha-${d.id}`);
        if (!article) return;
        article.innerHTML = `
            <header class="full-ficha-header">
                <div class="full-ficha-id">${d.id}</div>
                <div>
                    <h3>${d.title}</h3>
                    <p>${d.subtitle}</p>
                </div>
            </header>
            <div class="full-ficha-body">
                ${ffSection('fa-exclamation-circle', 'Problema que atiende', d.problem, false)}
                ${ffSection('fa-lightbulb', 'Solución propuesta', d.solution, false)}
                ${ffSection('fa-cubes', 'Componentes clave', d.components.map(c => `<li>${c}</li>`).join(''), true)}
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-chart-line"></i> Impacto en economía y recaudación</h4><p>${d.impactEco}</p></section>
                    <section class="ff-card"><h4><i class="fas fa-users"></i> Impacto social</h4><p>${d.impactSoc}</p></section>
                </div>
                ${ffSection('fa-handshake', 'Modelo de contratación / negocio', d.model, false)}
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-coins"></i> Escala de inversión</h4><p>${d.investment}</p></section>
                    <section class="ff-card"><h4><i class="fas fa-rocket"></i> Piloto sugerido</h4><p>${d.pilot}</p></section>
                </div>
                <div class="ff-grid-2">
                    <section class="ff-card"><h4><i class="fas fa-chart-bar"></i> Indicadores de éxito</h4><ul class="ff-inline-list">${d.indicators.map(i => `<li>${i}</li>`).join('')}</ul></section>
                    <section class="ff-card"><h4><i class="fas fa-exclamation-triangle"></i> Riesgos y dependencias</h4><ul class="ff-inline-list">${d.risks.map(r => `<li>${r}</li>`).join('')}</ul></section>
                </div>
            </div>`;
    });
}

renderFullFichas();

document.body.style.overflow = 'hidden';

// ── Fade in on scroll ───────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.full-ficha, .roadmap-card, .stat-card, .table-wrapper, .figure-card, .valor-card, .timeline-item, .glos-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
});

console.log('%c🏛️ Yucatán Digital y Próspero', 'color: #d4af37; font-size: 18px; font-weight: bold;');
console.log('%cPropuesta Estratégica v1.0 · Octubre 2026', 'color: #0f3460; font-size: 13px;');
console.log('%cDocumento Confidencial · XGT Group Technologies', 'color: #8b2635; font-size: 12px; font-weight: bold;');
