import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

const TabContentReport = ({
    data
}) => {

    // const labels = data?.map((item) => item.title) || [];
    // const datas = data?.map((item) => item?.tugasSiswa?.[0]?.nilai || 0) || [];
    const sortedLabels = data?.labels?.sort((a, b) => a.id - b.id);

    const labelss = sortedLabels?.map((label) => label.title);
    const values = sortedLabels?.map((label) => {
        const tugas = data.tugasSiswa.find((t) => t.tugasId === label.id);
        return tugas?.nilai ? tugas.nilai : 0; // Nilai akan 0 jika tidak ditemukan
    });
    const [state, setState] = React.useState({

        series: [{
            name: 'Nilai',
            data: [80, 90, 75, 77, 89, 78, 93, 92, 79, 87, 84, 76]
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                // formatter: function (val) {
                //     return val + "%";
                // },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            title: {
                text: 'Hasil Nilai Tugas',
                floating: true,
                offsetY: 380,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },


    });

    useEffect(() => {
        setState(prev => ({
            ...prev,
            series: [{
                name: 'Nilai',
                data: values
            }],
            options: {
                ...prev.options,
                xaxis: {
                    ...prev.options.xaxis,
                    categories: labelss
                }
            }
        }))
    }, [data])
    return (
        <div className="overflow-x-auto bg-white mt-8 rounded-lg">
            <ReactApexChart options={state.options} series={state.series} type="bar" height={400} />
        </div>
    )
}

export default TabContentReport