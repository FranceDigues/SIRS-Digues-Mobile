//TODO supr apres control

[
    {
        label: "username",
        id: "forminput1",
        type: "text",
        value: "",
        placeholder: "Enter your username here.."
    },
    {
        label: "date",
        id: "forminput2",
        type: "date",
        value: new Date("01/01/1970"),
        placeholder: "Enter your date here ..",
        hide: "form1[0].value=='test'"
    },
    {
        label: "select1",
        id: "select1",
        type: "select",
        values: [
            {
                "text": "toto",
                "value": "testValue"
            },
            {
                "text": "titi",
                "value": "titiValue"
            }
        ],
        change: "if (form1[2].value=='testValue'){form1[3].values = [{'text': 'test','value':'blbl'}]}"
    },
    {
        label: "select2",
        id: "select2",
        type: "select",
        values: [
            {
                "text": "tata",
                "value": "tataValue"
            },
            {
                "text": "tutu",
                "value": "tutuValue"
            }
        ]
    }

];
/**
 * Created by harksin on 03/04/15.
 */

<button class="button button-block button-positive button-form" href="#/" ng-click="publishForm()">Valider
</button>

<button class="button button-block button-positive button-yellow" ng-click="openPopover()">Clore</button>