"use client"

import React, { useEffect } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/SCscroll-area"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
function page() {
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                router.push('/authpage'); // Redirect to login if no token is found
                return;
            }
        }
        fetchUserData()
    },
        [router]
    )

    let user = {
        role: "admin",
        card: [
            {
                team: "Argentina",
                manager: "Shaeakh",
                link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg"
            }
        ]
    }
    let manager = {
        maxbid: 600,
        current_balance: 8000,
        players_bought: 2
    }
    let remaining_time = {
        min: 2,
        sec: 30
    }
    let last_bidding_team = {
        team: "China",
        manager: "Shaeakh",
        link: "https://images2.alphacoders.com/980/thumb-1920-980120.jpg",
        Players_bought: 5,
        Current_balance: 600
    }
    let player = [
        {
            name: "Neimar",
            position: "Defense",
            category: "Gold",
            img_link: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg",
            base_value: 200,
            current_value: 500,
            sold: false
        },
        {
            name: "Ronaldo",
            position: "Forward",
            category: "Bronze",
            img_link: "https://i0.wp.com/sportytell.com/wp-content/uploads/2018/11/Ronaldo-Champions-league-Manchester-United.jpg?zoom=1.25&w=680&ssl=1",
            base_value: 200,
            current_value: 700,
            sold: false
        },
        {
            name: "Messy",
            position: "Forward",
            category: "Platinum",
            img_link: "https://tmssl.akamaized.net/images/foto/galerie/lionel-messi-argentina-world-cup-2022-1669496833-97535.jpg?lm=1669496856",
            base_value: 200,
            current_value: 1000,
            sold: false
        }
    ]
    let values = {
        sold: false
    }
    let teams_update = [
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        },
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        },
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        },
        {
            name: "Argentina",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1200px-Flag_of_Argentina.svg.png",
            Players_bought: 5,
            Current_balance: 600
        },
        {
            name: "Brazil",
            link: "https://cdn.britannica.com/47/6847-004-7D668BB0/Flag-Brazil.jpg",
            Players_bought: 6,
            Current_balance: 500
        },
        {
            name: "Portugal",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/600px-Flag_of_Portugal.svg.png",
            Players_bought: 7,
            Current_balance: 400
        }
    ]
    const [index, setIndex] = React.useState(0)
    let players = [
        {
            img_link: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Neymar_Jr._with_Al_Hilal%2C_3_October_2023_-_03_%28cropped%29.jpg",
            name: "Neymar",
            position: "Attacker",
            category: "Silver",
            sold: false
        },
        {
            img_link: "data:image/webp;base64,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UCB9BgAAaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5aW1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIGRjOlJpZ2h0cz0iMjAyNCBSb2JpbiBBbGFtL0lTSSBQaG90b3MiIHBob3Rvc2hvcDpDcmVkaXQ9IkdldHR5IEltYWdlcyIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjIxNTc4NjU3MzEiIHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9Imh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9ldWxhP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiBwbHVzOkRhdGFNaW5pbmc9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYvdm9jYWIvRE1JLVBST0hJQklURUQtRVhDRVBUU0VBUkNIRU5HSU5FSU5ERVhJTkciID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5Sb2JpbiBBbGFtL0lTSSBQaG90b3M8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjxkYzpkZXNjcmlwdGlvbj48cmRmOkFsdD48cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkxBTkRPVkVSLCBNQVJZTEFORCAtIEpVTkUgMTQ6IExpb25lbCBNZXNzaSAjMTAgb2YgQXJnZW50aW5hIHJ1bnMgYW5kIGxvb2tzIG9uIGR1cmluZyBhbiBJbnRlcm5hdGlvbmFsIEZyaWVuZGx5IGJldHdlZW4gR3VhdGVtYWxhIGFuZCBBcmdlbnRpbmEgYXQgQ29tbWFuZGVycyBGaWVsZCBvbiBKdW5lIDE0LCAyMDI0IGluIExhbmRvdmVyLCBNYXJ5bGFuZC4gKFBob3RvIGJ5IFJvYmluIEFsYW0vSVNJIFBob3Rvcy9HZXR0eSBJbWFnZXMpPC9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmdldHR5aW1hZ2VzLmNvbS9kZXRhaWwvMjE1Nzg2NTczMT91dG1fbWVkaXVtPW9yZ2FuaWMmYW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybDwvcGx1czpMaWNlbnNvclVSTD48L3JkZjpsaT48L3JkZjpTZXE+PC9wbHVzOkxpY2Vuc29yPgoJCTwvcmRmOkRlc2NyaXB0aW9uPgoJPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0idyI/PgoA",
            name: "Messy",
            position: "Forward",
            category: "Gold",
            sold: true
        },
        {
            img_link: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhITEhIWFRUXFhUXFRUVFRUVFRUVFRUXFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHx0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAIFBgEHAAj/xABHEAACAQIEAwUEBQkGBAcAAAABAgADEQQSITEFBkETIlFhcYGRobEHFCMyQlJicpLB0eHw8RYzQ1OCshVUorMXNDVjc3ST/8QAGwEAAgMBAQEAAAAAAAAAAAAAAQIAAwQFBgf/xAAwEQACAgEEAQQCAQMEAgMAAAAAAQIRAwQSITEFEyJBUTJhcYGRsRTB0fCh8RUzUv/aAAwDAQACEQMRAD8A8nXUy5IRs5XMlAsCiXkIkHQQWOkGO0UahZ95LLNjL3guBzS2KM85UOcRwWQaQtCp2ZvF1DtFTC0DpyxCMmTI0RAC0qYwamYUMiDnWBkoLSMRjoFWWFMDROjIyxdBKi6SCyF0S5jFbCVKNpGFIDmgIdJvIQIKWkFkolTF4SAqqayWSj7s4LCkRKwMtjFMgRCmSUUjtoSqgg0kTFcSFR7w2CqJ02gYyZMGSg2FzQNBUgXWCi31FRf8NxgQS1OjNLkjj+JZoHKyKBQV21ioZkUMtiVsmTGYAJlLGJBoC2KOEwokglN7QNATO1HvJQbJ0XhJYVql4CWKliDGQjCPXuIWiWKkxSE0gY0VY3n0ijNA6bQgPmfWQBBzIiECZGFSaIgSD3ZK0Fk2smzQpC2BaEEj5YSsOpkCSvDQLIE6wEG0qaQtETAO0WixC7wiyOCMmISzRrADvKwhLQFiYWjhmbZSfQGSwMk2EcfhMeDXyKwLrLJxQEGpUpQ2WJHG0hFfBAwoBAiMQGYrITEVjxdEg0WiywyUoRQNRdYRWdUSEDrSkRCYoiPssClR3sRF2j72LAQCgagkAw1BIQJE2WCw0RbaGwUCEZIRhhLaFOEQbQqTAvK5KhrsjeKE+hsBOnTgCh1aIUZmF/AdPU+UWxgRdmO5ithCIvSAgRkB0Pv6xlJoFEFGXSFhQOqsZCsEJCJHTBYyQC2sNgaC5YoSCiBsthBsepNpImO8VC1beSxHE+SSxljTQ0m0ZMpkuSDvI50PjxqRztYN5Z6KE8xjGSziamQg4psIrGQB3uYSEHvCBkUMZMVjCGXIQ+YyEODC1GVnWm7In32VWKr+kwFl9spmx4pi0UIzQURWMkFpEZh8fQamQjLDHcLxBfKaLggA5bXYBgCLgbGxGh1ERySfIyTaCUuAYjT7FhfQBu6SPHvdIrmho45Pos8LybXYFmKqBv3rn4AxXNUMsbvkI/LDZWZHBKqSV8bb6xYZLDPHRS8YwhphG6G46b/zeaYlDEkIIlgnyAqrrK2aYx4BEyCokiSId0fVdISpoGrRWi7HKhxNoVEMsgCrvI0VbjiAxSxTocRYSpu2BrIRGoinQDtJKJ6rJPSgTEaAZTGFonmgGO0t5GRBK+0CC0KiMhA6S1MVo6YzAW/LXHauHayMQjNdl6E2te3XQTJnTfuXwadPk2+19M7zRwlEyV6A+xq37v8Al1d2Qfmkar6MPwxceTcuQ5MVPgp6KyxsVQYzgU+1pn84emptrA3wHYzd4fGuaxcLmuATmDWJO5Nget5lm7dl+NcUPPj3NrgC2gsxO/Qd28ps0xikSGPZVIqVQiHU3KKD7Ddj7I6tqhZ7VyDwVXMpan3htcee1+oiq0JJplXx/AmpTWmgF8wNyQAO6RYsfOwmiGSnyZ3ib6MKGmlsqhFNnd5W2bljSiRNOGyp418HVhsGyj50JgJwDyWkY0YoIhjRZXkidC3hZTQ1RpCBElwMWAj0V2CxJFo1C2JZRISwy6yqi4gyCAgIrIFI4qSFqiiTrAPGKYBhGiyrJCjqtLLM4SmhbaNYjLrhXAXqHXTQldhmI6C/TfXylWRpFuNWbdMDTo0V7YB6VQZHQnQ9Qc1tHHRhsQJgUtrtHRjFSjtZh+YeCNhK7U7lkPepOR9+mdiembofTwImuPuVlDlXDEcMwVlLC4B1FyPiIWgOaaLTieICVGZSQ3d17252UW/bM8U2JaRZcJ43VqjJ2Zd162F9Ol5XKNGnFOxHGV6qVrvRc6i4UDNY9bmNHnixZcc1ZpeG9pdhZcoO6m9/ImwvK5cPhjLlDfG8LmGdGAUAmoGTMLWOx/CQTv5wz7VBxurs8txD3JIGk30YVLknRaRIueV0FquLRmhI5OQNN9YlDvJaD5hCitsXrNI0NCTRLCUixkSLPyRf4fhFwNJYoWZpyoIeF2k2UJubK3GU8sjY3pvsr6zRbBQK8Ngo6KkVlsVZPWKWqCBmCxvTpHweWJGeUqOPVkaDHI0AZoEqBKdkbwlZecARSwv4iMnQKs3GIuoXs9BplI6Efh/b56zBKTk7ZvUUo0ii4hxZitbDYom+j0j0VgDlYeoJBHrEp/Aymk+R5ec6NbBGjVpfbAEFiCykZSLjzvllsFyJkmnyYhnvNZlTNvgsJTxCqxYoSqtfTcqDbXwMwztSNUFaLHhOBp9rlpAsBuTuzfpdfCI+S+HD5GsT9XbItemGvsxFreV/CVp0GUeQuPxNGkqrSAAHhtCxarszfMfEaq0LobLVJpv5gqTYHpcBgZt02KM5W/gzZpuKpfJiWUb6zc8SMikfKQdInpfQ277Pgl4rxyQdyCDDmV2EJkgCL1khGRYcIAuJPk34Y3A2OHqjLL4nMzr3A8RVFjIyuC5M1xGrrKJPk6vtUCsqLAjC0L2j2JRylvAyyA+qi0aiOTsUrmVtcl2/gXJj2ZmrZy0AVE4RIK1RwLCKWXDGN9JAo0icQqUtWHaU2UhkPh4g/wA7TJljTL8c3RS8QoUahD0XYXaxpOSzKLfezHdfXxgjfyNOnyhN6QX+M0xhRQ2BDgHUj+fOWbRbLrCYqyBVcEqPwm9gSTr7zM+ox07L8Ux6lX0Ap1gjeJcAe0GZ646NEZfstKGKw1NCDUWozAZy1XOzEeA6DyUCK038D2l8gVcFbgkr0vqQPWLQGznG1vgnH5LU3H62T5PNmjdTozZ17TFVNNR7R4zoytcoyI5YHUe8QUnyiE6NTWx3+Y8YYvmmRoeVhoOnyjTxRkBSaO1aJExzxuHZdGSYnWEUIfANYiD5NuPMlGjRUsXYS9Mw5fcwFfHjaLKQkUUuLa5lLZrSbQsx0gsDhQG0eyujlIRWy+OMa7TSNvB6XIrWMF2CcdqAgxiiySiQO4lkkFbD00FoAJD3CEu4AFySAB4k7CPESRd8y1hTBUdAF9SNz77zHke6dmiPESm4BhwxqXZU7jd975V8yQCd/KNCtysHSYvjMGUcq66jc3vcEXVgQbEEEEEbgzqqMWrRmsSxKWEryR4GQLC4gowPX5jwlDSfDGuuUXdBqTAFqLVLajIQDr433EyNVwbMcovtWP4AkZjSwvZgizOxu9r7DNqAepHhElLirLeH+MaD4Spmcpcb3Y9Bbp74lUrEbt0WHFXU0ai30yn3jVfiBGwN71QMlbXZiTO0c4EVsbj2iI007QT6pqMw3H8kSPnlfAUNI4I08JYnaEGcNiLg3/D8vP3GNF3wyNUfVqQJ08L2+dpmyYPmJZGf2BRwJmLkEFe4teFsjpkAIAURqiLVmiE6RNEBj7RJ5LJ9iIBNxWKYrRphJE7xS60RZbx4mXMyFOlcx7MhpuFcDDi5meWXkvji4E+L8M7M6R4ysWUaKdmIlpWy55TH2pc/gQsP0iQq/wC4n/TFnKohirZDmGrmcCZYljLzlGucPmqh6dMqv36qO9Nb2F2Wn3jv0+UfFbnwSa9hX8448VK1PIFyU6FKijJ2YFRUDEVCtMkJmLGy3uAFvOnH2ozdmfJv7Pl/S0l2QWqUentEplAayeFxjIba/tEpnC+H2PGTj0OrxGq5yq++nhKXiS5ouWWT+RnCU3pZhU7vnvm9oitbugr29lzgMO2PrLhaLqhKOy5yQKrouYILbEgG1/AzXgwen7pd/wCCnLl3cLoSo8ORSRVVxUU2am4Ksrb2KyjV6nNCVLhfDO74zx+kzQ3u5Ndp9L+3Y39TQ/4SgemvvExLVZv/ANM7L8dpWq9OP9hDFcH1zUvapPyM24Ncusn9/wDk4ut8G/y0/wDZ/wCz/wCSr7Ir6fEeIP7Pb4TopV10eeaadPho7haveYeR+YA/bJB+4D6LzlrD1WqLUpVKa1KVSn2YqsQKtVyxp0V0IuwpuNbDpfURptVTAkc5tNGriHfDItNStM9mtwcxQGoHGy1A2YEKANBpe5NLxWr+R1OuGUlBpnaLEwnbQUMQrV4UgNnKVUmMKM6yUQq7yNEU2j4NFob1WOURpJRHKwuGpXYesWTpES5N1wlAqgXmO7ZqS4I8yYdShMsg+RJI8+xK6zSjO0XPL3dSq3iVA9gYn/cJVlY8Sr4jVvUvK4rgD7NhydZyb7ZdYpbEoebMClGt9noji4XopvYgeW3vm/T5XKLT+CjLBJ8FDRbU+793wPwl0OypkiDsNxqPSF30iASwbRtGGx/fK7UuJdh66CU1Ub/z7o8VFdgdhu2T+l42+IKZE1zut1I1BGhBGxFtjJuvolHoHNiZcc9QtnXE0qNam/5Q7JUI9brf2ic3W47ipfXB6HwOoSlLE/nlf0FKOZ2CqpJOgA3JnPhBzdI9FnzwwQc5ukg+Nwj0gC2XvEKLNqxILALcamwOns3mmWjmla5OVi85gnPa00vv/koeK4+mMPlsA5xTMARqKfYqtQ/olwvtQzbpsklBWcPymx6mWz/r+TPYV+8x8v2zVB3Js5zXBuOHU6eHpNWCpWyJg8Q1GqzK3aHKUrUyg0pocUiZWPfvU2y6O3uf9wdGYq1SzM7G7MxZj4ljcn3mWLgUHXIYXAsevgfA+szZqu0WQ6Ei0qoez5FJMj4B2x3DU7HWLF8ltcD9llxUZ8mIxD4QBHMO0DHigtN7MLQNWicpmlwuKYATHVM0xlwM8Udmp38o8FbBN8GLxCm817WjNY9gK2Wkw65ifZlUD5GZ8q5Q6ZV12u14qAX/AC/j2pqwA1bQenWK0WwZV8wYwu4F72t+8/smjDxH+SvK7ZVq+tvH+kuUuSsmlXURlNNgoNUphhcbxpqL5JFN9fAKmHHQEeB/ZFSmicMb7Mi2ZCvr19I8Jxlwhp4ZwVyTV/fB3KPGWUVGoGLWtw+n3vtsE/d8Ww9U/d9nyTzleSCknF/JbgzSw5Y5F8P/AL/4CYLiJTvo2XVA5IB+xc5XuSNBmancjXSc3RRSnKL7PR+ck54cc4/jf+Vx/uWHF+G5xYs3aqMOM7a06hDI3aqepUBlzj/MA66boNq38cnBybGko9/5MvzWVrFAoAqUwwPS9M2ZF9QS/wCsBM2Ntwv9s1+RxRx5VFd7Vf8AJmaNTKfgZbCW1nOasvafG6zUFw5qsaS7JpbQkgE2zFQWJCk2BNwJqg0+RJIWq1NABqT75ZJgo3eO5DIwVN6RLV1XNXS9819e55qDa3UDx357yKcrNG3ajz2rRIMsKuw+GpWiNjxRPE1LQJDNi/bt4xxBaNQh0QMI1hqd4FGy6EkkNrRsbzRDD9lc8ifRpeGV6ZUBrTHm08r4LMeRUXVdVenZfCLixNO2Pe7hGRxHDyCbidGM4S4Fy6PLBbvgSr0dCBKdRh+UUwlfBT1hkNj11mPYPJUcOPYCym0OwG5ipOscB0nURm6YCVUWNxtuIZqnaIix4ZjVXNnTOCLWHje4i5YzypbXTTNui1OLA5+rDcpKglTHVNRTUUh5AZv1t4FpW/zbl/P/AAPPyUlxhisa/S5/uVrq97kknxvcyzZKPRgctztu2Sp4r8qGOV/Iu0ueA4tFdg33KiMj+ADbE/z1mmDixJJ0WfDKTDuhhnS46EMpuAbHQqQSPAi4nI1kJYcu5cWeu8Vkx6rS+jPnbw1+vgtTUq1CKaBS7sqm17sWuANSbE5iO7bRiNjaJHVZMrUJPhky+N0+khLNBW4q1btJmLub3N731vv53nYlBbaR5VzlKTlJ22LYhQTMtEbABSuo1hTcSdl5ytlNZXqbIQQD1bofZv62lefM9tL5LMULds9OwPGsrrY79OhmCMnFmtxT4KvnXl1GV8VQAt96qg6D8Tr8yPU+M3QyblRllj2sw9wBGAIYp46RW2AzSABxwElF7CKQ1NPhWSlmPheaMaoqciq7S8vsNBQSJLTC4tF1wDiGW4J6yvJG0Xaee3IjU/U0qKW011mCMKlZ35590aMfjMBdjY9ZtXuicHP7ZujO42nclT0mWUaYN1oVOGAH7YEQVZbQNUA+JvA+QhE1BXr0lkeVtYCC3Goi01yiBxXbraWqcgUgoqXjqVgo+XCmowVFLOdlUFmPoo1Ox90WUEwphqvAMSil2w9dVXVmahVVVHiWIsJUor4YbGMHgsQoR7MqupyM2zLmsSviLzPqZqlGXJ1fFY8rlLJj4pU/6/8Ao2XHOXxglIIcVzVtRrMzAuiAZ6gGwGYqFtr16SnKljXXPwbdC8mpnbluVPcn++El/ky3MdbtsXWqqbio2e2gsWALLpoTe+vXedPE3OCZwM+NYskoXdOilfcyuSplZ8DAQklQg3GhlcoWNGVFlhuMP2lO/wCEm/ne0zvGuS+OR2j1PgnEvutuD94bix3uJTCW1miUdyPP+eeEfVMQQg+xqfaUT0yn71P1Um3plPWb4uzDLjgzBN4wqVsllg3F/og47ZmHuD0waqZtrwxVsEujecxqgw9lsDbpL1wUmApPrJyy6LousHw96o7ojJVyNkyJ8IucDyxUuCYXLgqjKnZrMNwNslr9Jz5p2egx6iOzoyfG+H1KFyDmBvv0mnDKlRyNS3OVmUqUiWv4wZVzZVBnDRlQ1ldjqWUjzkZECVNIyjwAi4tYwSVchJZ+vQg38jGTV39ko23O1McMxP1TCqgWnTplqj0qVSpWZxmLM1RT3fzRYbwVYED49wZap4a9CmtOrjKYz00GWmr3UdoFH3FIJY9AB6xkwfZd86cOSpgKGIw+UHBs2Gfsq1OoewLEUajtSY5WN9QTvUaSPPDII808KerVwFIEimnDKVao4vpRVGes3mbLYDqSItMKHF4nRxODZbmk9CoPq6OQS9N96K5FsoAAsDfZddZn1KXUu+0dfxSywl6kfxdqX6/b/wC/ZYcw8afE08RlS+GesHpvUW70SVXNYhvsw1763vfzlGWUnF/Rt0UMUMsIp++nddPv9c0Y3j9NM9OqgA7W+ZBslSnlV8v5hurDwzEdJ1sM4ygmjz+pwyw5ZY5c0Ub0czGV5V7ipEvqhlQyR8+HsILDREDr/NxK5IZG55Vx11CkzHONM2Qdo0PHOGfXcI9C16iXqUD1zqNU9GFx628JbhyVwVZoXyePIZrfRTi7DXlNM370BKzQcoYwwtLMfYJdDGJxTkWLEiXSYiF6AggMzZ8r4/LoRBlyKKJDHuZqn40qjWwmeOZSLpYaA1+aBl7rC/lKskuTqafDcLZScU4wKq94xYN2ZMsUrM4ACTNuTowLsZw+HBmZsujGyv5kwoyBh0PwOn7pEwyjRRWsB6S74KyLDSB8ohAfA7xev4CayhzcKvYLjsJRxRpKqLUc1EqtSXZHdGs9uhYHzvcxor4bA/0NYjHNisc31VnIq0GpXrUhfDUWX7UUlpG1lS6gga5rbm8ji4gVUMcu8Ir01r0TWaktSrXw2IQKmV0w+Fq18xZlOUabgbNeSUgoNiMBTp5vrVSswwbYZaiPULB8NVUBUw+2amKgvcWuuu8Kk+kShjDVcDh81OmVrlWBWsrC4ei6lDmI1VirkkE6VB4TJnybXyrs6/jdI80XJSSp1T+muf6/QhisYDn1XvOXNgNSWYjM27WzG0wuUpf1PQ49PixU+2lX8fwv2U3E2OWgel6xHjc1Be/uX3zt6ZViieR8jK9VP+f9iNJLNve8GdU7MsOQmIYASiyyqKrEYjpDQrYGidxBJWRF5y3jMr5T7Jkyx+TTil8HpHD6x7rA6jWUp07LnyeefSDwsUMWzoLU647ZPAMx+1X2Pc26BhOhB7kY5LazNZo9A3sbq0rQlZCm0eDoVhgt5duQqiz7aFSQKZY8J4kE3mXPFy6NGGW05xPiZc6RMOFrsfJlvoRFdpMkOTVhzS20SQk7mFFGUZo1LRmzNXIzRxlpWy2KZHE1w5CtsSAfQ7wdchn0ZqsddJe2Uo+SGJCI0JB2i9OmE+/Nb2GTrhkGsPjWRalMmwqKFY2FyoYMBm6C4BPjYXjqXxMH8D1XjmKIA7d7A3FrKb9l2FyygEns+5cnUQ7KBZXtVvbML2AA62A2AvsPKHd+iDuBr5VP2JbXfTwmHVJSkvg7ni8rx45ezdyEp8S1uKdvXeZ/S/ZuWubfED7E4pnUAi3fZh+qqn5fCdTTprGkee1s1PPKVUSp3Bzb6C9vKWZoXG/oz43zR2s2aYJTo2wwuSE6uF6yRypuhcmmcVaO4PDFjYRsmRQXIuDTyyukNV8I1FlY7E7+B8JmjljktIvz6Wenab6ZuOA464EpaCuRrnHhoxOCZhq9A9op65D3ao9LWb/RL8UmkK8alJJ/J5b9WM0eoVf6ZjTDOdJdRkbAVaOUiToiLbCUhliNsvjHgTxKay3FyVZFQLsxNO1FVnyqIUkQZWnpKssDTilwDzWmRoaUkyVpXJluOK7IobmJK0rL4KMpbQ+Iw5teU48/uo1Z9Gtm5FA86MjhI4hgTCyVYbGNNXyBHw7wt16SL3KidEV8Dt8oF9MJOnUKmx1EMZuDp9AasY7vjaXe0XkfwA7pBYAX8Zh1UXuTO34zIvTlG/kYXD021FQLbfzlCTNktr/Fknw9Nb5Tfxv8xOxi2bE0ec1EZRyNSdiVLeGStNFcXUkydZ8s46i5OjtSyLHGyQrXEVwcWFZVOJZcBRb6zJq5So6Hj4xRf46klRChGhHtB6ETnY5yhLcjo5sUcsHCXTKnhVU0yabfeQ29VOx9069qaUl8nmJYpYpvHL4N3weqMi5tVYFWHiraEe4wwdMWSsof/Dcf8z8JfSJ68voxeHQKJvo5YpiaoLRZMeEbY7Tq2WZ5M6GPDYqTcy7Ty5K9Th2o+Im85xEiAgxTOkjVjRlQLs7mYsipj3Y1UoWExufJ0seJuNlcmje2XypwMuO45kXzpekx8FJ+E46dZUv2eokrwSb+mZIid9njkDIiDBaZvpHi74YATCxiO0whPvevz84/5A6PgMwsd5O1TIfI2XRhpAm48SRO+h3C4dGvYAmLmgqTj0bNJtk3GS5Dpw3w0lKizS8SXRF8OV63m3Cvac7UWp8kby4oC8QXQTlQdZGjq6iN4Yy+6FqTy2UbMmPI4qh7h+IytMuoxXE36HUNTo0tLEggaziyg0z0sZpqxXGYdqrKaQu4uCPFNyT6an3zXo272fZzPKQi4LKu4/4PReUeXqlaghN7EbjQexjv7p0Fg+zgvUL4NN/Y9vyz+t/CWeivsT/Ufo/OL4m4tNTZno5TS5iMvghphpK5xN2GYtTqaxsSdgz5FVMJmnRj0cmbt8EgukYQ+pvAmEn2msz5kNFjj1LrORkj7jv6eXsRT1D3prjzA5mR1lstUxV6bL4qR8Jz3hrKpfs7sdQp4HH7RnGUjedlr7PMkSIGiEDEYQo7w85Z+SB0BBKmVcxYexpGDes0JqSFqggt/WHgB1AAbqNfKV5Eq4LsLalZNBVPW0pUWat82FFJupvNWGJlz3as+yy6jOcxlS9h5D5TnzxpZWzd6zlijH6FNo1mdponTYxZJNUwwk4u0PUsaRMc9OnydXFr5Lhj+B4w9Js6EBrMLkA2DCx0OnWJDG4O0X5cscsNs+j3T6N+P06mApszKoQBGuQAGXQ79NNPWbk/bbOBONTcUaL+0OG/zl9x/dF3x+w+lP6Pz5V5XI/CfdMvqTPYf/GYWujUcD5IV1F13mqTqJxtRgjjlSHqnIKbWE4OXXTjJxbEglQnieQFCkgCDH5GafYZY4y7KrgHKatVdXF7fAT0um1Hqw3HIz49kqNniOT6C0msANNpepsoo8W4hTFOq6jYMR8Y1jrlF9y1wpa286emwQlDdI5us1MsTpG0wnJ1Mg3BlebBg+EW6LX5pumZ/jnLCI2gnF1K2dHsdDo1njckWPK3JK1TdhpE0+NS90h9bjhp47YmF5r4X9XxuJw5/BUOX9BwKif9LCblT4POS7spnoQOAEwL05W4hsEQRrKuUMFBD76GWcT4fYvQFlKmVuMoMbsPSqBt9D8DLIzUu+BWqGEQjYmPKDSGxy9wZC3jK0maHIn2njLIumJLlUQL32l92Zao0vAuXfrFIVD+UV939ZswaXFkjun2c/V6+WCaiixPJI8DLlodOZn5ab+Di8ljwMWWgwMsx+Vdci2K5RtsDCvG4aDPyzsT/suxNgDK5+NxxTY2Pyjk6Ha3DKuDqYdC5ykOwW+m+pt467zzeokm2l8Hc01vll3/AMRfxmU2nqOL4bTKnuidlRTLYarJfZXcHspKjoZTlitvBbqG5e5ltWGs8nr47cv8meHQB0v0mJFqMlxCquHqFj3cx3npvE5E1tMGthas5xPjR7IlWvpYTtqPJzqPGceSXYnck3jSQUajkDEHtCs6WhncZROX5PE9qkeyU1ypuNpmyT5bNfjdPbRicaxrV7A9bCcTLJznR9K0uJYcKPR+XuHinTUeU1fjGkeY8jqPUmzyL6eeHlMZQrjapRynT8dJj181df1Y0G6OU1wed0av8RNEZWI0TKA7RqAAakD5RHBMNi9XBnpKpYfoZSIByujC4+MVSlHiSsPD6OnDhtVPsk9NS5iyW12dSo6bi4kTnDvonDGEqq3Wx85FKL6LN3AY0DaWKAjkfILS1KkVs9R+jtz9WK2Gjk38cwB1+U24fxOF5KNZE/tGplxzgVSMgNiGKaaMaK2T4JhM73toJi8nqlix0dPxuncpbii+k05Mdhgfu9gPeaj3+QnjcOX1VJ/s9ZiW0RyDxEY1G+5gxmIok63U+W06OWc4cro7OixYM0VxyJ8qYt2ZyTfWLCTlFth8ljjFJI19YnSee8mvejjwAvfznMRajE85YI1FnT0Of05WJlhujRl6GHqFchOk9D/rEzneh8FDxjhGU+2WR1G7gWWGjV8lctZWV7azvwhDDjv5ZwNTqZZJ+mujfcYcpRb0nM1E6i2em8Ng3TRU8m8KLt2h9k52CNvcz1HktQscNqPRUTKJc3bPIze+RjfpJ4AcbgqqoM1Wn9rSHUsgN1H6S5h7RLekXTgljo/OKnzt5yfJjGabfyJfF2ITYXhohwU/A2golkGW+8jQQX1UbgkGV+ku1wHcECMNyD8DGSku+QcHxoKdxI4RfwTc0SpnJs2ngZK2/JOwiPmOg/dGTvoD4PWuRsIqYVWBLGoSzX2DDuWUf6Zvxqoo8/r5uWWmujQE+UejGAqv5CPFAbKvF1CTYdZoVRjuYIwc5Uazl3C5VE8J5rW75NHrdFgWOCRk/pT4Ca1ehUDWz0mpejU2zoR653/VE5/jsnEo/wBTo41bo85/4RxDwHv/AITqe0bbM/Q/MFBXptcdJ0ErVMs0GeUJox/KK2Z9PxTPBbYtHa8lO1E2FV9p57yTuaORAWr1Dac2ixGb4oS15px8McyuIJVp18TtGaaplZi2DOvqJtwL3x/koyfizfcvLoPSepz/AIo8jFXnZLmTMwVBfvECcfVc8I9/4WKitz+Eajl7h/Z01FukTiMaM2v1DyTY3xKvlUyR45M2lxOciPCxcBoZPgs1a2uj8vcyYI0cXiqLDKUr1QB+bnJQjyKkEesZNSOe+Ct0XqIeI/IOwyV79CfZb5yxTBRPMfyT7xG3P6BRyzeA98Fy+icHGJ6lRA2/loPBG5/K9wt8zBb+ycHGpnxJ9Tb5CRp/ZLRwJbcX98FV2SxigbHTaPFis9Y+j3EBsKVP4KjD2MA3zLTbj5ijieQjWS/tGjdhLUmc8VxNdVEthBsVsBwdO1qXtoJk8nqlhxbTpeO07lLczeYZQqgWnzjUZd82z08VSM/9IHDK1fDK9AA1aD9qqH/EAVlZB4EhrjzAHWPo8qx5Pd0+B4y2uzzb+2n/ALY94ne2mn1Ees8w8SVKbeNvGdJvaizRaWUpplVynQslyNSSfeZQ/wATX5DJ76XwaCsddhPM67nIzDB8CmJfTYTCXIzvEa9r7TVihuC3Ri+M4nU2nXxRpGWcrKbCFnqKPOdHRQ35kjLqJ7cbZ6jwFSB7J6PUV0eU00t2Vsf7LNVUsdtpzMkfce50s3HA0jV0CLTPLs52S2yt41gDVWwNpKtUbtDqFilbI8OVqahT0jqPFFmp25XaPKvpp5aXN9fViWd0SotgAAKeVWB3P3LH1HhF2cmHJj247ro8pVAD0jJJMzWNLLkIw1NSxyqCSdgouT6AaxrAfYrCtTOWojo1gcrq6Eg7GzC9tDr5ReGHkX0HgPhF4JyfNp4QshGnU3iqRKJ9rG3Eo+DC+kloh6B9GGK71emTuqsP9BIP+8e6bMD4o5Xkoe1SN1VYATVFNnHbRS4j7RwgvL5zWKDkw4MbnOkbTgHDVpqNJ4Hy2teSTVnrdLhUIouxbwnnjYSB8oSCH/BsN/y9L/8ANf3R/Un9shhsOzV3ALE+M9Xjm8j5PZZVDBBtcG64dhQiiW55bYnls2TfII9p5bK90mwxE8QB5zJ8l0TDc14sJedTRwbBldIwuPx062PC2YpzSD8uYkPVGk6/jdM1mt/BzvIZ0sLPV+EkaaDadHOee0kved4t2gytTA0PhOVqW48o+geKljlHbMJg+N1Roy+6c96+KdSRty6DFL8WXOF4yrb6S+GfFk6ZzsuhlHoeWurdZcl9GNwnEzfPHD0xGFq0iQCy90no41U+8CO3StmvDjlmi4P5PzZWRlYgixBIPkQbH4wX8o5UouLcX2uA+BKl07Q9zOue2hyZhmsfS8sTdCnt3KvNPDaeMoYPhmE/vGKPiCMpKKjuTma9Sp9z8VhKZQk47pMiMb9NOJWpxNwv+HRpU2/S71T5VFluFewDPP6mGv8AwjShZFKhGvTKHeZpxcGWJpk6b6QxkBoOsuQp0iQhqOQcVlxdIdGDIfapI+IE16eXuMWuhuwv9HpWOqWG86mNHm2C5bphqpuZh8vNxxcHU8ZFOZ6LQQACfNs8m5uz1EVSCZfOUhPtJAndISGQ5VwSgZjuZ63TcRv7O95PUX7UamrUUC15j1+V1tRxI8uxdqq+I+E4zRamJYmumvemdxdl8WeS/SHjAWAU9Z6TxWLi2ZNZPhJGMZyRrO0opHOcmzS8i0AXLGdXQxqLkcfyk3SieqYSsqkaxckZM5uOSjJM0eFZGXxnMyxldM9Po9TxwDr0qYM8x5TG4STR3IaiTiDqUKZnKU5IZaiSFKwK/dabsWvzR+S+GWMvyRSYyjUqm2a4+E0y18pL3M6eHNhxq6PLvpA4IaNTtQNHNn02fofb8x5zo6DVxyrZ8o895b05ZvUh89/yZJW9J0kzl0ehfQmmbiYP5FCq3/VTX5MffJkftIjL8x4hqmLxbsblsRWPs7RgB6AAD2SyHEUB9iC0wTrDSfYLIYvCC3X3mLPGmiKXJVgzKWjFNpZFgYSPwKWfAa2TEUGHSrT9xYAy/C6mirMrxyX6Z6rjjuLzv41weRsd5Uw/fJvON5qVY6Oz4pctnoFNdBPnGV3JnpV0Tt5xAnLeciCfW84aIYngOwnrNP8AgbNZ2WWI3nP1f5mSHQB5gZYhDFdYnyWxPLObv70T02g/AxarspG2m8xmp5KnS0XRyvIG8pzWzjIvuF/dnPz9nb0HQWvPJ+VPSYuiM4YQVeEsgH4fKsxfPowf0p/3dT0X/es2+H/+9f8Afg5uc8iO89cZ0ejfQX/6jU/+rW/7lGDJ+IDIcY/8zif/AJ6//daXR/FAfYskZAHD90xhTNHec/5NAxTlkRWSjMg7w/8AvKf6a/7hL8X5L+UVZPxf8HquL3M9EujyKLblfczg+a/E7fi+jaL0nz6f5HoF0SifIT5YQolAE//Z",
            name: "Mbappe",
            position: "Forward",
            category: "Gold",
            sold: false
        },
        {
            img_link: "https://tmssl.akamaized.net/images/foto/galerie/christiano-ronaldo-portugal-jubel-1571133805-26578.jpg?lm=1571133812",
            name: "Ronaldo",
            position: "Forward",
            category: "Gold",
            sold: true
        }
    ]

    const [pause, set_Pause] = React.useState(false);
    function handle_Pause() {
        set_Pause(!pause);
    }
    const [bid_able, set_Bid_able] = React.useState(true);
    const [current_bid, set_Current_bid] = React.useState(200);

    function handle_Bid_ability(current_bid: any, bid_increase: any) {
        if (manager.maxbid < (current_bid + bid_increase)) {
            set_Bid_able(false);
        }
        else {
            set_Current_bid(current_bid + bid_increase);
        }
    }


    return (
        <div className='w-screen h-screen flex justify-center'>
            {user.role === "manager" && (
                <div className='w-1/3 bg-black bg-opacity-15  flex flex-col justify-around items-center bg-grey-300'>
                    {(bid_able === false) && <div className='m-2 p-2 rounded-lg font-mono font-bold text-2xl  text-center bg-red-500 bg-opacity-75'>
                        You can't bid more then {manager.maxbid} points
                    </div>}
                    <p className='p-2 border-2 border-black font-mono font-bold text-xl  rounded-lg'>Your Team</p>
                    <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                        <img className='object-cover rounded-lg h-full ' src={last_bidding_team.link} alt="" />
                    </div>
                    <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Current Balance : {5000000}</div>
                    <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Players Bought : {500}</div>
                    <div className='border-2 border-black rounded-lg'>
                        <div className='flex justify-around w-full' >
                            <p className='m-2 p-2 font-mono font-bold text-xl '>Place you bid</p>
                            <div className='m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Your max bid : {-50}</div>
                        </div>
                        <div className='w-full m-2 p-2 rounded-lg h-max '>
                            <div className=' flex flex-col justify-around items-around gap-5'>
                                <div className='flex justify-around w-full px-2'>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 50)}>50</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 100)}>100</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 150)}>150</button>

                                </div>
                                <div className='flex justify-around w-full px-2'>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 200)}>200</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 250)}>250</button>
                                    <button className="px-8 py-2 w-20 flex justify-center rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-black"
                                        onClick={() => handle_Bid_ability(player[0].current_value, 300)}>300</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {user.role === "admin" && (
                <div className='w-1/3 p-4 bg-black bg-opacity-15 flex flex-col justify-center items-center bg-grey-300  font-mono font-bold text-center '>
                    <h1 className='text-3xl' >Teams Overview</h1>
                    <div className='p-4'>
                        <div className=" grid grid-rows-auto border-2 rounded-md border-black grid-cols-4 gap-x-0 gap-y-4 p-4 justify-items-center">
                            <p>Logo</p>
                            <p>Team Name</p>
                            <p>Players</p>
                            <p>Current Balance</p>
                        </div>
                    </div>
                    <ScrollArea className='w-full rounded-md px-4 '>
                        {teams_update.map((team, index) => (
                            <div key={index} className="border border-2 rounded-md border-black grid grid-rows-auto grid-cols-4 gap-x-0 gap-y-4 p-4 justify-items-center">
                                <img src={team.link} alt="" className="h-10 rounded-lg self-center" />
                                <p className="self-center">{team.name}</p>
                                <p className="self-center">{team.Players_bought}</p>
                                <p className="self-center">{team.Current_balance}</p>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            )}

            <div className={`w-1/3 text-2xl text-center  flex flex-col ${(user.role === "player") ? ("border-l-2 border-black") : ""}  items-center justify-center font-mono font-bold gap-4`}>
                <div className='w-full text-2xl text-center flex flex-col items-center justify-center font-mono font-bold gap-y-4 '>
                    <img className='h-52 w-52 overflow-hidden rounded-lg object-cover' src={players[index].img_link} alt="" />
                    <div className=' grid grid-cols-3 grid-rows-3 gap-x-0 gap-y-4'>
                        <p className='w-min'>Name</p>
                        <p>:</p>
                        <p>{players[index].name}</p>
                        <p>Position</p>
                        <p>:</p>
                        <p>{players[index].position}</p>
                        <p>Category</p>
                        <p>:</p>
                        <p>{players[index].category}</p>
                    </div>
                </div>
                <p className='border-2 border-black p-2 rounded-lg'>Current Bid : {current_bid}</p>
                <p>{(values.sold) ? "Sold" : "Available"}</p>
                {(user.role === "admin") && (
                    <div className='flex flex-col items-center gap-4'>
                        <div className='flex w-full justify-around'>
                            <div className='px-2' >
                                <button onClick={()=>{
                                    if(index === 0){
                                        setIndex(players.length-1)
                                    }
                                    else 
                                    setIndex((index-1))
                                }} className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                    <FaAngleLeft />
                                </button>
                            </div>
                            <div className='px-2' >
                                <button onClick={()=>setIndex((index+1)%players.length)} className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  ">
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <button className="px-8 py-2 rounded-md bg-black text-white font-bold transition duration-200 hover:bg-white hover:text-black hover:border-2 hover:border-black border-2 border-white  " onClick={handle_Pause}>
                            {(pause === false) ? "Resume" : "Pause"}
                        </button>
                    </div>
                )
                }
            </div>
            <div className='w-1/3  h-screen flex flex-col justify-center items-center gap-4 bg-black bg-opacity-15 text-2xl text-center font-mono font-bold  '>
                <p className='p-2 border-2 border-black rounded-lg'>Last bidding Team</p>
                <div className='h-36 overflow-hidden rounded-lg flex justify-center w-full'>
                    <img className='object-cover rounded-lg h-full ' src={last_bidding_team.link} alt="" />
                </div>
                <div className=' grid grid-cols-3 grid-rows-auto gap-x-0 gap-y-4 p-4'>
                    <p>Team</p>
                    <p>:</p>
                    <p>{last_bidding_team.team}</p>
                    <p>Manager</p>
                    <p>:</p>
                    <p>{last_bidding_team.manager}</p>
                    {user.role === "admin" && (<p className='text-nowrap '>Current Balance</p>)}
                    {user.role === "admin" && (<p>:</p>)}
                    {user.role === "admin" && (<p>{last_bidding_team.Current_balance}</p>)}
                    {user.role === "admin" && (<p className='text-nowrap'>Players Bought</p>)}
                    {user.role === "admin" && (<p>:</p>)}
                    {user.role === "admin" && (<p>{last_bidding_team.Players_bought}</p>)}
                </div>
                <div className='w-44 m-2 p-2 border-2 border-black rounded-lg font-mono font-bold text-xl  text-center '>Time remaining</div>
                <div className='flex justify-center m-2 p-2  rounded-lg font-mono font-bold text-xl  text-center '>
                    <div className='w-12 border-2 border-black rounded-lg'>{remaining_time.min}m</div>
                    <div className='mx-2'>:</div>
                    <div className='w-12 border-2 border-black rounded-lg'>{remaining_time.sec}s</div>
                </div>
            </div>
        </div>

    )
}

export default page