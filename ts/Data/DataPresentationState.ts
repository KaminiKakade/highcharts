/* *
 *
 *  Data Layer
 *
 *  (c) 2012-2020 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type DataEventEmitter from './DataEventEmitter';
import DataJSON from './DataJSON.js';
import U from '../Core/Utilities.js';
const {
    addEvent,
    fireEvent,
    merge
} = U;

/* *
 *
 *  Class
 *
 * */

class DataPresentationState implements DataEventEmitter<DataPresentationState.EventObject>, DataJSON.Class {

    /**
     * Converts a supported class JSON to a DataPresentationState instance.
     *
     * @param {DataPresentationState.ClassJSON} json
     * Class JSON (usually with a $class property) to convert.
     *
     * @return {DataPresentationState}
     * DataPresentationState instance from the class JSON.
     */
    public static fromJSON(
        json: DataPresentationState.ClassJSON
    ): DataPresentationState {
        const presentationState = new DataPresentationState();

        if (json.columnOrder) {
            presentationState.setColumnOrder(json.columnOrder);
        }

        return presentationState;
    }

    /* *
     *
     *  Properties
     *
     * */

    public columnOrder?: Array<string>;

    protected isModified?: boolean;

    /* *
     *
     *  Functions
     *
     * */

    /**
     * Emits an event on this table to all registered callbacks of the given
     * event.
     *
     * @param {DataTable.EventObject} e
     * Event object with event information.
     */
    public emit(e: DataPresentationState.EventObject): void {
        fireEvent(this, e.type, e);
    }

    public getColumnOrder(): Array<string> {
        return merge(this.columnOrder);
    }

    public isSet(): boolean {
        return this.isModified === true;
    }

    /**
     * Registers a callback for a specific event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.EventCallback} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    public on(
        type: DataPresentationState.EventObject['type'],
        callback: DataEventEmitter.EventCallback<this, DataPresentationState.EventObject>
    ): Function {
        return addEvent(this, type, callback);
    }

    public setColumnOrder(
        columnOrder: Array<string>,
        eventDetail?: DataEventEmitter.EventDetail
    ): void {
        const presentationState = this,
            oldColumnOrder = merge(presentationState.columnOrder),
            newColumnOrder = merge(columnOrder);

        presentationState.emit({
            type: 'columnOrderChange',
            detail: eventDetail,
            newColumnOrder,
            oldColumnOrder
        });

        presentationState.columnOrder = newColumnOrder;
        presentationState.isModified = true;

        presentationState.emit({
            type: 'afterColumnOrderChange',
            detail: eventDetail,
            newColumnOrder,
            oldColumnOrder
        });
    }

    /**
     * Converts the table to a class JSON.
     *
     * @return {DataJSON.ClassJSON}
     * Class JSON of this table.
     */
    public toJSON(): DataPresentationState.ClassJSON {
        const json: DataPresentationState.ClassJSON = {
            $class: 'DataPresentationState'
        };

        if (this.columnOrder) {
            json.columnOrder = merge(this.columnOrder);
        }

        return json;
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

/**
 * Additionally provided types for events and JSON conversion.
 */
namespace DataPresentationState {

    /* *
     *
     *  Declarations
     *
     * */

    /**
     * Describes the class JSON of a DataTable.
     */
    export interface ClassJSON extends DataJSON.ClassJSON {
        columnOrder?: Array<string>;
    }

    /**
     * Event types related to the column order.
     */
    export type ColumnOrderEventType = (
        'columnOrderChange'|'afterColumnOrderChange'
    );

    /**
     * All information objects of DataPrsentationState events.
     */
    export type EventObject = (ColumnOrderEventObject);

    /**
     * Describes the information object for order-related events.
     */
    export interface ColumnOrderEventObject extends DataEventEmitter.EventObject {
        type: ColumnOrderEventType;
        newColumnOrder: Array<string>;
        oldColumnOrder: Array<string>;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default DataPresentationState;